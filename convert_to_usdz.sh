#!/bin/bash
# Helper script to convert GLB to USDZ
# Since Reality Converter isn't available, this provides alternative options

GLB_FILE="$1"
USDZ_FILE="${2:-${GLB_FILE%.glb}.usdz}"

if [ -z "$GLB_FILE" ]; then
    echo "Usage: ./convert_to_usdz.sh <input.glb> [output.usdz]"
    echo ""
    echo "Alternative USDZ Conversion Options:"
    echo ""
    echo "Option 1: Online Converters (Recommended)"
    echo "  • https://products.aspose.app/3d/conversion/glb-to-usdz"
    echo "  • https://www.vectary.com/3d-modeling-news/how-to-convert-glb-to-usdz/"
    echo "  • https://imagetostl.com/convert/file/glb/to/usdz"
    echo ""
    echo "Option 2: Use the GLB directly in your HTML"
    echo "  iOS devices support GLB in AR Quick Look (iOS 12+)"
    echo "  <model-viewer src='model.glb' ios-src='model.glb' ar ...>"
    echo ""
    echo "Option 3: Install Blender with USD plugin"
    echo "  1. Install Blender: brew install --cask blender"
    echo "  2. Import GLB and export as USDZ"
    exit 1
fi

if [ ! -f "$GLB_FILE" ]; then
    echo "Error: File '$GLB_FILE' not found"
    exit 1
fi

echo "============================================================"
echo "GLB to USDZ Converter Helper"
echo "============================================================"
echo "Input GLB:  $GLB_FILE"
echo "Target USDZ: $USDZ_FILE"
echo ""

# Try method 1: Check if we have Python USD library
echo "Checking for Python USD library..."
if python3 -c "from pxr import Usd, UsdGeom" 2>/dev/null; then
    echo "✓ Found USD Python library, attempting conversion..."

    python3 << EOF
from pxr import Usd, UsdGeom, Gf
import sys

try:
    # This is a placeholder - actual GLB to USD conversion requires more work
    print("Note: Direct USD conversion requires additional setup")
    print("Falling back to alternative methods...")
    sys.exit(1)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
EOF

    if [ $? -eq 0 ]; then
        echo "✓ Conversion successful!"
        echo "Output: $USDZ_FILE"
        exit 0
    fi
fi

# If we get here, automatic conversion failed
echo ""
echo "============================================================"
echo "⚠️  Automatic conversion not available"
echo "============================================================"
echo ""
echo "Please use one of these methods:"
echo ""
echo "1. ONLINE CONVERTER (Easiest):"
echo "   • Visit: https://products.aspose.app/3d/conversion/glb-to-usdz"
echo "   • Upload: $GLB_FILE"
echo "   • Download and save as: $USDZ_FILE"
echo ""
echo "2. USE GLB FOR IOS (Recommended):"
echo "   iOS 12+ supports GLB in AR Quick Look!"
echo "   Update your HTML:"
echo "   <model-viewer"
echo "       src='$GLB_FILE'"
echo "       ios-src='$GLB_FILE'"
echo "       ar ar-modes='scene-viewer webxr quick-look'>"
echo ""
echo "3. BLENDER (Advanced):"
echo "   • Install Blender: brew install --cask blender"
echo "   • File → Import → glTF 2.0"
echo "   • File → Export → Universal Scene Description (.usdz)"
echo ""
echo "============================================================"
