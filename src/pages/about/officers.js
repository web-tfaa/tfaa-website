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
      css={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
        // Handle non-square image. The property isn't supported by IE11.
        // objectFit: 'cover',
      }}
      alt={alt}
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
            src="http://res.cloudinary.com/drumsensei/image/upload/v1520487878/Janda_vfnenl.jpg"
          />
          <CardHeadline>President</CardHeadline>
          <FuturaParagraph><a href="mailto:johnjanda@tomballisd.net">JD Janda</a></FuturaParagraph>
          <FuturaParagraph>Director of Fine Arts, Tomball ISD</FuturaParagraph>
        </Card>
        <Card>
          <Avatar
            alt="vice-president picture"
            src="http://res.cloudinary.com/drumsensei/image/upload/v1520487875/Moreno_gcct0g.jpg"
          />
          <CardHeadline>Vice-President</CardHeadline>
          <FuturaParagraph><a href="mailto:patricia.h.moreno@austinisd.org">Patricia Moreno</a></FuturaParagraph>
          <FuturaParagraph>Coordinator of Fine Arts, Austin ISD</FuturaParagraph>
        </Card>
        <Card>
          <Avatar
            alt="vice-president picture"
            src="http://res.cloudinary.com/drumsensei/image/upload/v1520487803/Lester_cbl78k.jpg"
          />
          <CardHeadline>Treasurer</CardHeadline>
          <FuturaParagraph><a href="mailto:jon.lester@abileneisd.org">Jay Lester</a></FuturaParagraph>
          <FuturaParagraph>Executive Director of Fine Arts, Abilene ISD</FuturaParagraph>
        </Card>
        <Card>
          <Avatar
            alt="president picture"
            src="http://res.cloudinary.com/drumsensei/image/upload/v1520488181/Turner_a0buat.jpg"
          />
          <CardHeadline>Secretary</CardHeadline>
          <FuturaParagraph><a href="mailto:jeff_turner@allenisd.org">Jeff Turner</a></FuturaParagraph>
          <FuturaParagraph>Director of Fine Arts, Allen ISD</FuturaParagraph>
        </Card>
        <Card>
          <Avatar
            alt="president picture"
            src="http://res.cloudinary.com/drumsensei/image/upload/v1520488589/Muths_nnamrv.jpg"
          />
          <CardHeadline>Past-President</CardHeadline>
          <FuturaParagraph><a href="mailto:dmuths@hotmail.com">Dean Muths</a></FuturaParagraph>
          <FuturaParagraph>Director of Visual & Performing Arts (retired), Clear Creek ISD</FuturaParagraph>
        </Card>
      </Cards>
    </div>
  </div>
);
