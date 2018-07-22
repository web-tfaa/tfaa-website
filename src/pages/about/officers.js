// External Dependencies
import Helmet from 'react-helmet';
import React from 'react';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import FuturaParagraph from '../../components/shared/futura-paragraph';

// Helpers
import presets from '../../utils/presets';

const Avatar = ({ alt, src }) => (
  <div
    css={{
      position: 'relative',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      flexShrink: 0,
      borderRadius: '50%',
      overflow: 'hidden',
      width: 120,
      height: 120,
      marginBottom: 16,
      [presets.Phablet]: {
        height: 140,
        width: 140,
      },
      [presets.Tablet]: {
        height: 160,
        width: 160,
      },
    }}
  >
    <img
      alt={alt}
      css={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
        // Handle non-square image. The property isn't supported by IE11.
        // objectFit: 'cover',
      }}
      src={src}
    />
  </div>
);

// Component Definition
export default () => (
  <div>
    <Helmet>
      <title>TMAC | Officers</title>
    </Helmet>
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Cards>
        <Card>
          <Avatar
            alt="president picture"
            src="https://res.cloudinary.com/tmac/image/upload/v1523131020/Moreno.jpg"
          />
          <CardHeadline>President</CardHeadline>
          <FuturaParagraph><a href="mailto:patricia.h.moreno@austinisd.org">Patricia Moreno</a></FuturaParagraph>
          <FuturaParagraph>Coordinator of Fine Arts, Austin ISD</FuturaParagraph>
        </Card>
        <Card>
          <Avatar
            alt="vice-president picture"
            src="https://res.cloudinary.com/tmac/image/upload/v1523131021/Lester.jpg"
          />
          <CardHeadline>Vice-President</CardHeadline>
          <FuturaParagraph><a href="mailto:jon.lester@abileneisd.org">Jay Lester</a></FuturaParagraph>
          <FuturaParagraph>Executive Director of Fine Arts, Abilene ISD</FuturaParagraph>
        </Card>
        <Card>
          <Avatar
            alt="treasurer picture"
            src="https://res.cloudinary.com/tmac/image/upload/v1523131020/Turner.jpg"
          />
          <CardHeadline>Treasurer</CardHeadline>
          <FuturaParagraph><a href="mailto:jeff_turner@allenisd.org">Jeff Turner</a></FuturaParagraph>
          <FuturaParagraph>Director of Fine Arts, Allen ISD</FuturaParagraph>
        </Card>
        <Card>
          <Avatar
            alt="secretary picture"
            src="https://res.cloudinary.com/tmac/image/upload/v1532300879/jim-egger.jpg"
          />
          <CardHeadline>Secretary</CardHeadline>
          <FuturaParagraph><a href="mailto:jim.egger@mcallenisd.net">Jim Egger</a></FuturaParagraph>
          <FuturaParagraph>Director of Fine Arts, McAllen ISD</FuturaParagraph>
        </Card>
        <Card>
          <Avatar
            alt="past-president picture"
            src="https://res.cloudinary.com/tmac/image/upload/v1523131020/Janda.jpg"
          />
          <CardHeadline>Past-President</CardHeadline>
          <FuturaParagraph><a href="mailto:johnjanda@tomballisd.net">JD Janda</a></FuturaParagraph>
          <FuturaParagraph>Director of Fine Arts, Tomball ISD</FuturaParagraph>
        </Card>
      </Cards>
    </div>
  </div>
);
