# UI

## Generating Palettes and Themes

Our project's colors and themes are managed through Google's [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/). This tool helps us create and maintain cohesive color palettes that align perfectly with **Material Design 3** guidelines.

### How to Use the Material Theme Builder

1. **Access the Tool**: Navigate to the [Material Theme Builder website](https://material-foundation.github.io/material-theme-builder/).

2. **Define Your Colors**:

   * Select primary, secondary, and tertiary colors for your palette.
   * The tool automatically generates harmonious color shades and ensures accessibility compliance.

3. **Export the Theme**:

   * Once you've fine-tuned your palette, use the export feature to download theme definitions in formats such as JSON or CSS.

4. **Integrate with The Theme**:

   * Place the exported JSON/CSS file in the appropriate directory within `@workspace/ui/theme`.
   * Ensure your colors and tokens are properly mapped to our project's custom tokens and naming conventions.
