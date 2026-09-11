import zlib, struct, math, os

def write_png(width, height, get_pixel_func, output_path):
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # filter type 0 (None)
        for x in range(width):
            r, g, b, a = get_pixel_func(x, y, width, height)
            raw_data.extend((r, g, b, a))

    def make_chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    idat = zlib.compress(bytes(raw_data), 9)

    png_bytes = b'\x89PNG\r\n\x1a\n' + make_chunk(b'IHDR', ihdr) + make_chunk(b'IDAT', idat) + make_chunk(b'IEND', b'')
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, 'wb') as f:
        f.write(png_bytes)
    print(f"Generated {output_path} ({width}x{height})")

def clamp(val, low=0, high=255):
    return max(low, min(high, int(val)))

def render_islamic_icon(x, y, w, h, is_maskable=False):
    # Normalized coords from 0.0 to 1.0
    nx = x / float(w)
    ny = y / float(h)
    
    # Center distance
    dx = nx - 0.5
    dy = ny - 0.5
    dist = math.sqrt(dx*dx + dy*dy)

    # Base background: Deep celestial navy gradient (#050B14 to #0E2849)
    grad_t = 0.5 + 0.5 * (dy * 1.2 - dx * 0.4)
    grad_t = max(0.0, min(1.0, grad_t))
    r = int(5 * (1 - grad_t) + 14 * grad_t)
    g = int(11 * (1 - grad_t) + 40 * grad_t)
    b = int(20 * (1 - grad_t) + 73 * grad_t)
    a = 255

    # If not maskable, round corners (squircle / rounded rect rx=0.22)
    if not is_maskable:
        # Corner radius check
        corner_r = 0.22
        # Check 4 corners
        cx = min(nx, 1.0 - nx)
        cy = min(ny, 1.0 - ny)
        if cx < corner_r and cy < corner_r:
            cdx = corner_r - cx
            cdy = corner_r - cy
            if (cdx*cdx + cdy*cdy) > (corner_r * corner_r):
                return (0, 0, 0, 0) # transparent outside rounded corners

    # Outer gold border (inset 0.02)
    border_w = 0.015
    inset = 0.025
    if (nx < inset or nx > (1.0 - inset) or ny < inset or ny > (1.0 - inset)):
        if (nx >= (inset - border_w) and nx <= (1.0 - inset + border_w) and
            ny >= (inset - border_w) and ny <= (1.0 - inset + border_w)):
            # Gold shimmer
            gold_t = (nx + ny) * 0.5
            r = int(212 * gold_t + 255 * (1 - gold_t))
            g = int(175 * gold_t + 224 * (1 - gold_t))
            b = int(55 * gold_t + 130 * (1 - gold_t))
            return (r, g, b, 255)

    # Crescent Moon
    # Outer circle: center at (0.48, 0.40), radius = 0.23
    moon_cx1, moon_cy1, moon_r1 = 0.48, 0.40, 0.23
    d1 = math.sqrt((nx - moon_cx1)**2 + (ny - moon_cy1)**2)

    # Inner cutout circle: center at (0.54, 0.36), radius = 0.20
    moon_cx2, moon_cy2, moon_r2 = 0.54, 0.36, 0.20
    d2 = math.sqrt((nx - moon_cx2)**2 + (ny - moon_cy2)**2)

    in_moon = (d1 <= moon_r1) and (d2 > moon_r2)

    # Star at (0.64, 0.35), size ~ 0.05
    star_cx, star_cy = 0.64, 0.34
    sdx = abs(nx - star_cx)
    sdy = abs(ny - star_cy)
    in_star = (sdx + sdy < 0.045) or (sdx < 0.015 and sdy < 0.05) or (sdy < 0.015 and sdx < 0.05)

    # Mosque dome at bottom: center (0.50, 0.76)
    dome_dx = (nx - 0.50) / 0.16
    dome_dy = (ny - 0.70) / 0.16
    in_dome = (dome_dx*dome_dx + dome_dy*dome_dy <= 1.0) and (ny >= 0.70) and (ny <= 0.86)

    # Mosque base rect:
    in_base = (nx >= 0.32 and nx <= 0.68 and ny >= 0.82 and ny <= 0.92)

    # Minaret left:
    in_min_left = (nx >= 0.24 and nx <= 0.28 and ny >= 0.56 and ny <= 0.92)
    # Minaret left spire:
    in_spire_left = (abs(nx - 0.26) <= (0.56 - ny) * 0.3) and (ny >= 0.48 and ny <= 0.56)

    # Minaret right:
    in_min_right = (nx >= 0.72 and nx <= 0.76 and ny >= 0.56 and ny <= 0.92)
    # Minaret right spire:
    in_spire_right = (abs(nx - 0.74) <= (0.56 - ny) * 0.3) and (ny >= 0.48 and ny <= 0.56)

    # Mosque door (arch):
    door_dx = (nx - 0.50) / 0.05
    door_dy = (ny - 0.86) / 0.05
    in_door = (nx >= 0.45 and nx <= 0.55 and ny >= 0.86 and ny <= 0.92) or (door_dx*door_dx + door_dy*door_dy <= 1.0 and ny >= 0.81 and ny <= 0.86)

    if in_door:
        return (7, 19, 34, 255) # dark navy interior

    is_gold_element = in_moon or in_star or in_dome or in_base or in_min_left or in_spire_left or in_min_right or in_spire_right

    if is_gold_element:
        # Luxury gold gradient (#FFEAA7 to #D4AF37 to #AA771C)
        gold_val = 0.5 + 0.5 * (nx - ny)
        gold_val = max(0.0, min(1.0, gold_val))
        gr = int(255 * (1 - gold_val * 0.3))
        gg = int(220 * (1 - gold_val * 0.3))
        gb = int(120 * (1 - gold_val * 0.6))
        return (gr, gg, gb, 255)

    # Glow around the crescent
    if d1 <= (moon_r1 + 0.05) and d2 > (moon_r2 - 0.02):
        glow_factor = max(0.0, 1.0 - (abs(d1 - moon_r1) / 0.05))
        r = clamp(r + 60 * glow_factor)
        g = clamp(g + 45 * glow_factor)
        b = clamp(b + 15 * glow_factor)

    return (r, g, b, a)

def main():
    write_png(512, 512, lambda x, y, w, h: render_islamic_icon(x, y, w, h, is_maskable=False), 'public/pwa-512x512.png')
    write_png(192, 192, lambda x, y, w, h: render_islamic_icon(x, y, w, h, is_maskable=False), 'public/pwa-192x192.png')
    write_png(512, 512, lambda x, y, w, h: render_islamic_icon(x, y, w, h, is_maskable=True), 'public/pwa-maskable-512x512.png')
    write_png(180, 180, lambda x, y, w, h: render_islamic_icon(x, y, w, h, is_maskable=False), 'public/apple-touch-icon.png')
    
    # Screenshots for PWABuilder store readiness
    # Mobile screenshot (390x844)
    def render_screenshot_mobile(x, y, w, h):
        nx, ny = x / float(w), y / float(h)
        # Gradient background
        bg_r = int(7 + 10 * ny)
        bg_g = int(19 + 25 * ny)
        bg_b = int(34 + 40 * ny)
        # Golden card in center
        if 0.08 <= nx <= 0.92 and 0.15 <= ny <= 0.55:
            # Main card
            return (16, 36, 60, 255)
        if 0.08 <= nx <= 0.92 and 0.60 <= ny <= 0.88:
            return (14, 30, 50, 255)
        return (bg_r, bg_g, bg_b, 255)

    write_png(390, 844, render_screenshot_mobile, 'public/screenshot-mobile.png')

    def render_screenshot_wide(x, y, w, h):
        nx, ny = x / float(w), y / float(h)
        bg_r = int(5 + 10 * ny)
        bg_g = int(11 + 25 * ny)
        bg_b = int(20 + 40 * ny)
        if 0.10 <= nx <= 0.90 and 0.12 <= ny <= 0.88:
            return (14, 32, 54, 255)
        return (bg_r, bg_g, bg_b, 255)

    write_png(1280, 720, render_screenshot_wide, 'public/screenshot-wide.png')

if __name__ == '__main__':
    main()
