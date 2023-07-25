// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import Motifs from '../shared/Motifs';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.resourcesTitle': {
    fontSize: 34,
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },

  '.sectionTitle': {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },

  section: {
    marginBottom: theme.spacing(6),
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(18, 6),
  },

  display: 'flex',
  overflow: 'hidden',
  padding: theme.spacing(10),
  position: 'relative',
  width: '100%',
}));

// Component Definition
const ResourcesList: React.FC = () => {
  return (
    <StyledRoot>
      <Motifs small />

      <div>
        <Typography
          className="resourcesTitle"
          component="h2"
          variant="h4"
        >
          Dedicated to excellence in
          Fine Arts education
        </Typography>

        <div className="eventsList">
          <section>
            <Typography
              className="sectionTitle"
              component="h3"
            >
              Shared Resources
            </Typography>

            <ul>
              <li>
                <Link to="https://drive.google.com/drive/folders/1c2_3vNy1WVILd1KnpQTTvSSbTRBArMc6?usp=drive_link">
                  Resources Shared at TFAA Conferences and Roundtables
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <Typography
              className="sectionTitle"
              component="h3"
            >
              Texas State Standards
            </Typography>

            <ul>
              <li>
                <Link to="https://tea.texas.gov/Academics/Curriculum_Standards/TEKS_Texas_Essential_Knowledge_and_Skills_(TEKS)_Review/Fine_Arts_Texas_Essential_Knowledge_and_Skills/">
                  Fine Arts Texas Essential Knowledge and Skills (TEKS)
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <Typography
              className="sectionTitle"
              component="h3"
            >
              Professional Organizations
            </Typography>

            <ul>
              <li>
                <Link to="https://acda.org/">
                  American Choral Directors Association (ACDA)
                </Link>
              </li>

              <li>
                <Link to="http://aosa.org/">
                  American Orff-Schulwerk Association (AOSA)
                </Link>
              </li>

              <li>
                <Link to="https://www.astastrings.org/">
                  American String Teachers Association (ASTA)
                </Link>
              </li>

              <li>
                <Link to="https://www.cedfa.org/">
                  Center for Educator Development in Fine Arts (CEDFA)
                </Link>
              </li>

              <li>
                <Link to="https://nafme.org/">
                  National Association for Music Education (NAfME)
                </Link>
              </li>

              <li>
                <Link to="https://www.midwestclinic.org/">
                  The Midwest Clinic
                </Link>
              </li>

              <li>
                <Link to="https://nationalbandassociation.org/">
                  National Band Association (NBA)
                </Link>
              </li>

              <li>
                <Link to="http://www.oake.org/">
                  Organization of American Kodály Educators (OAKE)
                </Link>
              </li>

              <li>
                <Link to="https://www.pas.org/">
                  Percussive Arts Society (PAS)
                </Link>
              </li>

              <li>
                <Link to="https://www.tmea.org/">
                  Texas Music Educators Association (TMEA)
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </StyledRoot>
  );
};

export default ResourcesList;
