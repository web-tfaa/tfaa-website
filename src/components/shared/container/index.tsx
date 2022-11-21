// External Dependencies
import { FC } from 'react';

// Internal Dependencies
import presets from '../../../utils/presets';
import { rhythm, options } from '../../../utils/typography';

// Local Typings
interface Props {
  className?: string;
  css?: unknown;
  hasSideBar?: boolean;
}

// Component Definition
const Container: FC<Props> = ({
  children,
  className,
  css = {},
  hasSideBar = true,
}) => (
  <div
    css={{
      maxWidth: hasSideBar ? rhythm(presets.maxWidthWithSidebar) : rhythm(presets.maxWidth),
      margin: '0 auto',
      padding: `${rhythm(1.5)} ${rhythm(options.blockMarginBottom)}`,
      paddingBottom: rhythm(3.5),
      position: 'relative',
      [presets.Tablet]: {
        paddingBottom: rhythm(1.5),
      },
      ...css,
    }}
    className={className}
  >
    {children}
  </div>
);

export default Container;
