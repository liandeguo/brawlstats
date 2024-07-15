import os
from PIL import Image
import subprocess

def resize_and_convert(image_path, output_dir, scale=0.25):
    try:
        # Open an image file
        with Image.open(image_path) as img:
            # Calculate new dimensions
            new_width = int(img.width * scale)
            new_height = int(img.height * scale)
            
            # Resize image
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Create output path for the WebP image
            webp_path = os.path.join(output_dir, os.path.splitext(os.path.basename(image_path))[0] + ".webp")
            
            # Convert resized image to WebP format
            resized_img.save(webp_path, 'webp')
            
            print(f"Converted {image_path} to {webp_path}")
    except Exception as e:
        print(f"Failed to process {image_path}: {e}")

def process_images(input_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    for root, _, files in os.walk(input_dir):
        for file in files:
            if file.lower().endswith(('png', 'jpg', 'jpeg')):
                image_path = os.path.join(root, file)
                resize_and_convert(image_path, output_dir)

# Define input and output directories
input_directory = './battleIcons'  # Replace with your input directory
output_directory = './battleIconsResized'  # Replace with your output directory

# Process images
process_images(input_directory, output_directory)
