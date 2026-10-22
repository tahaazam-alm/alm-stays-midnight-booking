// Renders a design-system SVG icon imported as a string.
//   import pin from '@ds-icons/line-icons/pin.svg?raw'
//   <Icon svg={pin} size={20} />
// Line icons use currentColor, so they take the text colour of their parent.
// Import icons one by one (not with a glob) so only the used ones end up in the build.
export function Icon({ svg, size = 24, className = '', style, label }) {
  return (
    <span
      className={`ds-icon ${className}`}
      style={{ width: size, height: size, ...style }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
