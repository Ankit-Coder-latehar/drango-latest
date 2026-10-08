import os
import cv2
import numpy as np
from PIL import Image

output_dir = r"c:\Users\Asus\Desktop\drangoi-latest\public\videos"
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, "thar_roxx_maharaja_loop.mp4")

images_dir = r"c:\Users\Asus\Desktop\drangoi-latest\public\images"
img_names = [
    "hero_roxx_maharaja.jpg",
    "grille_roxx_gold.jpg",
    "interior_roxx_starlight.jpg",
    "insta_3.jpg",
    "alloys_roxx_gold.jpg"
]

target_w = 1280
target_h = 720
fps = 30
shot_duration = 3.5  # seconds per shot
transition_duration = 0.8  # seconds crossfade
frames_per_shot = int(shot_duration * fps)
transition_frames = int(transition_duration * fps)

loaded_images = []
for name in img_names:
    p = os.path.join(images_dir, name)
    if os.path.exists(p):
        pil_img = Image.open(p).convert("RGB")
        # Cover resize
        img_ratio = pil_img.width / pil_img.height
        target_ratio = target_w / target_h
        if img_ratio > target_ratio:
            new_h = target_h
            new_w = int(new_h * img_ratio)
        else:
            new_w = target_w
            new_h = int(new_w / img_ratio)
        resized = pil_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        # Center crop to exact target
        left = (new_w - target_w) // 2
        top = (new_h - target_h) // 2
        cropped = resized.crop((left, top, left + target_w, top + target_h))
        # Convert to numpy BGR for cv2
        np_img = np.array(cropped)[:, :, ::-1].copy()
        loaded_images.append(np_img)
    else:
        print(f"Missing {p}")

print(f"Loaded {len(loaded_images)} shots")

# Create video writer
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
writer = cv2.VideoWriter(output_path, fourcc, fps, (target_w, target_h))

num_shots = len(loaded_images)

# Pre-generate subtle golden sparkles particles
num_particles = 45
particles = [
    {
        "x": np.random.uniform(0, target_w),
        "y": np.random.uniform(0, target_h),
        "vx": np.random.uniform(-0.3, 0.3),
        "vy": np.random.uniform(-0.8, -0.2),
        "radius": np.random.uniform(1.5, 3.5),
        "alpha": np.random.uniform(0.4, 0.9),
        "phase": np.random.uniform(0, np.pi * 2)
    }
    for _ in range(num_particles)
]

def render_ken_burns(img, progress, zoom_in=True):
    # zoom between 1.0 and 1.08
    if zoom_in:
        scale = 1.0 + 0.08 * progress
    else:
        scale = 1.08 - 0.08 * progress
    
    h, w = img.shape[:2]
    new_w = int(w * scale)
    new_h = int(h * scale)
    zoomed = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_LINEAR)
    
    # Slight pan
    x_pan = int((new_w - w) * (0.5 + 0.2 * (progress - 0.5)))
    y_pan = int((new_h - h) * 0.5)
    
    x_pan = max(0, min(new_w - w, x_pan))
    y_pan = max(0, min(new_h - h, y_pan))
    
    return zoomed[y_pan:y_pan+h, x_pan:x_pan+w]

frame_count = 0
for shot_idx in range(num_shots):
    img_current = loaded_images[shot_idx]
    img_next = loaded_images[(shot_idx + 1) % num_shots]
    zoom_in = (shot_idx % 2 == 0)
    
    for f in range(frames_per_shot):
        progress = f / frames_per_shot
        frame_base = render_ken_burns(img_current, progress, zoom_in=zoom_in)
        
        # Check if in crossfade transition to next shot
        if f >= (frames_per_shot - transition_frames):
            trans_prog = (f - (frames_per_shot - transition_frames)) / transition_frames
            next_base = render_ken_burns(img_next, trans_prog * 0.15, zoom_in=not zoom_in)
            frame_base = cv2.addWeighted(frame_base, 1.0 - trans_prog, next_base, trans_prog, 0)
            
        # Add subtle royal golden sparkle overlay
        sparkle_layer = np.zeros_like(frame_base, dtype=np.uint8)
        for p in particles:
            p["x"] = (p["x"] + p["vx"]) % target_w
            p["y"] = (p["y"] + p["vy"]) % target_h
            p["phase"] += 0.05
            twinkle = (np.sin(p["phase"]) + 1.0) / 2.0
            r = int(p["radius"])
            # Gold color BGR: (55, 175, 212) or (110, 216, 249)
            color = (int(55 * p["alpha"] * twinkle), int(175 * p["alpha"] * twinkle), int(245 * p["alpha"] * twinkle))
            cv2.circle(sparkle_layer, (int(p["x"]), int(p["y"])), r, color, -1)
            
        final_frame = cv2.add(frame_base, sparkle_layer)
        writer.write(final_frame)
        frame_count += 1

writer.release()
print(f"Generated {frame_count} frames to {output_path}")
