// External Dependencies
import styled from 'styled-components';

// Internal Dependencies
import EnhancedAlert from '../EnhancedAlert';

// Local Variables
const StyledRoot = styled.div({
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 4,
  boxShadow: 'rgba(25, 17, 34, 0.05) 0px 3px 10px',
  marginBottom: '1em',
  padding: '2em 3em',
  textAlign: 'left',
});

// Component Definition
const SponsorCardAlertOnly: FC = () => (
  <StyledRoot>
    <EnhancedAlert title="Sponsorship Opportunities">
      More info to come on sponsorship opportunities for the 2022-23 fiscal year.
    </EnhancedAlert>
  </StyledRoot>
);

export default SponsorCardAlertOnly;
