# /update-docs

Update the docs story file for one component (or all components) based on the current component source and CLAUDE.md. Or, with `--publish`, just build and deploy the docs site to Netlify without touching any stories.

## Usage

```
/update-docs Button
/update-docs TextInput
/update-docs            ← updates all components
/update-docs --publish  ← builds and deploys to Netlify only; does NOT update any docs
```

## What to do

Parse `$ARGUMENTS` first:
- If `--publish` is present, set a `publish` flag. **`--publish` is a deploy-only flag** — skip all story updates and jump straight to the [If `--publish` flag is present](#if---publish-flag-is-present) section. Ignore any component name passed alongside it.
- Otherwise, treat the remaining text as the component name (if any) and update stories as described below.

### If a component name is given (`$ARGUMENTS`)

1. Read the component source at `src/components/<Name>.jsx` (or `src/components/List.jsx` for ListItem).
2. Read the relevant section in `CLAUDE.md` — find the `### <Name>` heading and extract the text until the next `###`.
3. Read the existing story at `docs/src/stories/<Name>.story.jsx`.
4. Update the story so that:
   - `description` matches what CLAUDE.md says (concise, one paragraph)
   - `args` reflects the current default prop values from the component source
   - `argTypes` lists every prop the component accepts, with the correct `control` type:
     - string unions → `'select'` with `options` array
     - boolean → `'boolean'`
     - number → `'number'` with optional `min`/`max`
     - free text → `'text'`
     - React node / function → `'none'` (not controllable via UI)
   - `examples` covers the main variants shown in CLAUDE.md
   - `render` uses a stateful wrapper for any props that need two-way binding (checked, value, onChange, open, etc.)
5. Write the updated file. Do not change the import or the `export default` shape.

### If no argument is given

Repeat the above for every component listed in `docs/src/stories/index.js`.

## Story file format

```jsx
import { ComponentName } from 'design-system'

// Only add this if the component needs controlled state:
// import { useState } from 'react'

export default {
  title: 'ComponentName',
  category: 'Actions | Inputs | Navigation | Layout | Content | Feedback | Overlays',
  component: ComponentName,
  description: 'One paragraph from CLAUDE.md.',
  // previewFull: true,        // add for full-width components (Navbar, TabBar, BottomActionBar)
  // previewPadding: 'none',   // add for edge-to-edge previews
  args: {
    /* default prop values */
  },
  argTypes: {
    propName: {
      control: 'select' | 'boolean' | 'number' | 'text' | 'none',
      options: ['a', 'b'],        // only for select
      description: 'Short description',
    },
  },
  // render: (args) => <StatefulWrapper {...args} />,  // only when needed
  examples: [
    { name: 'Variant name', args: { /* overrides */ } },
  ],
}
```

## Rules

- Keep descriptions concise — one paragraph, no bullet points.
- Only add a `render` function when the component cannot be used without two-way binding (checked, value, open, etc.).
- `args` values must match the component's actual JS default parameters, not the CLAUDE.md docs.
- Do not invent props that don't exist in the component source.
- Preserve any existing `examples` that are still valid.
- Do not modify any other file (App.jsx, Sidebar, etc.).

## If `--publish` flag is present

When `--publish` is passed, **do not update any stories** — go straight to deploying. Run the following in sequence using the Bash tool:

```bash
cd docs && npm run build && npm run deploy
```

- If the build fails, report the error and stop — do not attempt to deploy.
- If the deploy succeeds, Netlify will print a "Website URL" line. Extract and display that URL to the user.
- If `netlify-cli` is not installed or the site is not linked (no `docs/.netlify/state.json`), tell the user to run `cd docs && npm install` then `npx netlify init` before using `--publish`.
