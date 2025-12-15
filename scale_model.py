#!/usr/bin/env python3
"""
3D Model Resizer Script
Scales USDZ/GLB models to specific dimensions (in cm)

Usage:
    python3 scale_model.py <input_file> <width_cm> <height_cm> <depth_cm> [output_file]

Example:
    python3 scale_model.py model.glb 240 85 95 model_scaled.glb
    python3 scale_model.py model.usdz 240 85 95 model_scaled.usdz
"""

import sys
import os
import argparse
import subprocess
from pathlib import Path


def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import trimesh
        import numpy
        return True
    except ImportError as e:
        print(f"Error: Missing required dependencies.")
        print(f"Please install them using: pip3 install trimesh numpy")
        return False


def get_model_bounds(mesh):
    """Get the actual dimensions of the model"""
    bounds = mesh.bounds
    dimensions = bounds[1] - bounds[0]  # max - min for each axis
    return dimensions


def scale_glb_model(input_path, target_width_cm, target_height_cm, target_depth_cm, output_path):
    """
    Scale a GLB model to specific dimensions

    Args:
        input_path: Path to input GLB file
        target_width_cm: Target width in cm (X axis)
        target_height_cm: Target height in cm (Y axis)
        target_depth_cm: Target depth in cm (Z axis)
        output_path: Path to output GLB file
    """
    import trimesh
    import numpy as np

    print(f"Loading GLB model from: {input_path}")

    # Load the model
    try:
        mesh = trimesh.load(input_path, force='mesh')
    except:
        # If it's a scene with multiple meshes
        scene = trimesh.load(input_path)
        if isinstance(scene, trimesh.Scene):
            mesh = scene.dump(concatenate=True)
        else:
            mesh = scene

    # Get current dimensions
    current_dims = get_model_bounds(mesh)
    print(f"Current dimensions: {current_dims[0]:.2f} x {current_dims[1]:.2f} x {current_dims[2]:.2f} units")

    # Convert target dimensions from cm to meters (standard for 3D models)
    # GLB/GLTF typically use meters as the base unit
    target_width_m = target_width_cm / 100.0
    target_height_m = target_height_cm / 100.0
    target_depth_m = target_depth_cm / 100.0

    print(f"Target dimensions: {target_width_m:.2f} x {target_height_m:.2f} x {target_depth_m:.2f} meters")
    print(f"Target dimensions: {target_width_cm} x {target_height_cm} x {target_depth_cm} cm")

    # Calculate scale factors for each axis
    scale_x = target_width_m / current_dims[0]
    scale_y = target_height_m / current_dims[1]
    scale_z = target_depth_m / current_dims[2]

    print(f"Scale factors: X={scale_x:.4f}, Y={scale_y:.4f}, Z={scale_z:.4f}")

    # Apply non-uniform scaling
    scaling_matrix = np.eye(4)
    scaling_matrix[0, 0] = scale_x
    scaling_matrix[1, 1] = scale_y
    scaling_matrix[2, 2] = scale_z

    mesh.apply_transform(scaling_matrix)

    # Verify new dimensions
    new_dims = get_model_bounds(mesh)
    print(f"New dimensions: {new_dims[0]:.2f} x {new_dims[1]:.2f} x {new_dims[2]:.2f} meters")
    print(f"New dimensions: {new_dims[0]*100:.2f} x {new_dims[1]*100:.2f} x {new_dims[2]*100:.2f} cm")

    # Export the scaled model
    print(f"Saving scaled model to: {output_path}")

    # Export with proper GLB settings
    if output_path.endswith('.glb'):
        mesh.export(output_path, file_type='glb')
    else:
        mesh.export(output_path)

    print("✓ Model scaled successfully!")


def convert_usdz_to_glb(usdz_path, glb_path):
    """Convert USDZ to GLB using available tools"""
    print(f"Converting USDZ to GLB...")

    # Check if usd-core is available
    try:
        from pxr import Usd, UsdGeom
        # Use USD Python bindings to convert
        stage = Usd.Stage.Open(str(usdz_path))
        stage.Export(str(glb_path))
        return True
    except ImportError:
        print("Warning: USD Python bindings not available.")
        print("For USDZ support, install: pip3 install usd-core")
        return False


def convert_glb_to_usdz(glb_path, usdz_path):
    """Convert GLB to USDZ using available tools"""
    print(f"Converting GLB to USDZ...")

    # Check for xcrun (macOS Reality Converter)
    try:
        result = subprocess.run(
            ['xcrun', 'usdz_converter', str(glb_path), str(usdz_path)],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            print("✓ Conversion successful using Reality Converter")
            return True
        else:
            print(f"Error: {result.stderr}")
            return False
    except FileNotFoundError:
        print("Warning: Reality Converter (xcrun) not available.")
        print("USDZ conversion is only available on macOS with Xcode installed.")
        return False


def scale_usdz_model(input_path, target_width_cm, target_height_cm, target_depth_cm, output_path):
    """
    Scale a USDZ model to specific dimensions
    Strategy: Convert USDZ -> GLB -> Scale -> Convert back to USDZ
    """
    import tempfile

    print("Processing USDZ file...")

    # Create temporary files
    temp_dir = tempfile.gettempdir()
    temp_glb_input = os.path.join(temp_dir, 'temp_input.glb')
    temp_glb_scaled = os.path.join(temp_dir, 'temp_scaled.glb')

    # Step 1: Convert USDZ to GLB using xcrun (macOS)
    print(f"Converting USDZ to GLB for processing...")
    try:
        # Try using Reality Converter to convert USDZ to GLB
        result = subprocess.run(
            ['xcrun', 'usdz_converter', str(input_path), temp_glb_input],
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            raise Exception(f"Reality Converter failed: {result.stderr}")

        print("✓ Converted to GLB for processing")

        # Step 2: Scale the GLB
        scale_glb_model(
            temp_glb_input,
            target_width_cm,
            target_height_cm,
            target_depth_cm,
            temp_glb_scaled
        )

        # Step 3: Convert back to USDZ if needed
        if output_path.endswith('.usdz'):
            print(f"\nConverting scaled model back to USDZ...")
            result = subprocess.run(
                ['xcrun', 'usdz_converter', temp_glb_scaled, str(output_path)],
                capture_output=True,
                text=True
            )

            if result.returncode != 0:
                print(f"Warning: Could not convert to USDZ: {result.stderr}")
                print("Saving as GLB instead...")
                output_path = output_path.replace('.usdz', '.glb')
                os.rename(temp_glb_scaled, output_path)
            else:
                print("✓ Converted back to USDZ successfully!")
        else:
            os.rename(temp_glb_scaled, output_path)

        # Cleanup
        for temp_file in [temp_glb_input, temp_glb_scaled]:
            if os.path.exists(temp_file):
                os.remove(temp_file)

        print("✓ Model scaled successfully!")

    except FileNotFoundError:
        print("\nError: Reality Converter (xcrun) not found.")
        print("USDZ conversion requires macOS with Xcode Command Line Tools.")
        print("\nAlternative: Use GLB format instead:")
        print(f"  python3 scale_model.py <input.glb> {target_width_cm} {target_height_cm} {target_depth_cm}")
        sys.exit(1)

    except Exception as e:
        print(f"\nError processing USDZ: {e}")
        print("\nTroubleshooting:")
        print("1. Ensure Xcode Command Line Tools are installed:")
        print("   xcode-select --install")
        print("2. Try converting your USDZ to GLB first and scale the GLB")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description='Scale 3D models (GLB/USDZ) to specific dimensions in centimeters',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s model.glb 240 85 95
  %(prog)s model.glb 240 85 95 scaled_model.glb
  %(prog)s model.usdz 240 85 95 scaled_model.usdz

Note: Dimensions are Width(X) x Height(Y) x Depth(Z) in centimeters
        """
    )

    parser.add_argument('input_file', help='Input 3D model file (GLB or USDZ)')
    parser.add_argument('width', type=float, help='Target width in cm (X axis)')
    parser.add_argument('height', type=float, help='Target height in cm (Y axis)')
    parser.add_argument('depth', type=float, help='Target depth in cm (Z axis)')
    parser.add_argument('output_file', nargs='?', help='Output file (optional, defaults to input_scaled.ext)')

    args = parser.parse_args()

    # Validate input file
    if not os.path.exists(args.input_file):
        print(f"Error: Input file '{args.input_file}' not found.")
        sys.exit(1)

    # Check dependencies
    if not check_dependencies():
        sys.exit(1)

    # Determine output file
    if args.output_file is None:
        input_path = Path(args.input_file)
        args.output_file = f"{input_path.stem}_scaled{input_path.suffix}"

    # Get file extension
    input_ext = os.path.splitext(args.input_file)[1].lower()

    print("=" * 60)
    print("3D Model Resizer")
    print("=" * 60)
    print(f"Input:  {args.input_file}")
    print(f"Output: {args.output_file}")
    print(f"Target: {args.width}cm (W) x {args.height}cm (H) x {args.depth}cm (D)")
    print("=" * 60)
    print()

    # Process based on file type
    if input_ext == '.glb':
        scale_glb_model(
            args.input_file,
            args.width,
            args.height,
            args.depth,
            args.output_file
        )
    elif input_ext == '.usdz':
        scale_usdz_model(
            args.input_file,
            args.width,
            args.height,
            args.depth,
            args.output_file
        )
    else:
        print(f"Error: Unsupported file format '{input_ext}'")
        print("Supported formats: .glb, .usdz")
        sys.exit(1)

    print()
    print("=" * 60)
    print(f"✓ Done! Scaled model saved to: {args.output_file}")
    print("=" * 60)


if __name__ == '__main__':
    main()
