import { Card, Elevation, H3, H5 } from '@blueprintjs/core';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { doc, setDoc, collection, getDocs, getDoc } from '@firebase/firestore';
// import Box from '@mui/material/Box';
import { firestore, auth, postToJSON } from '../../lib/firebase';
import Link from 'next/link';

const buttons = [
  // <Button
  //   key="one"
  //   varient="contained"
  //   component="label"
  //   onClick={() => {
  //     console.log('clicked');
  //   }}
  // >
  //   Goto Current Study
  // </Button>
];

export async function getStaticProps({ params }) {
  const { slug } = params;
  // console.log('slug', slug);
  const sluged = slug.toString();
  // console.log('sluged', sluged);
  let animal;
  let path;
  // let proto = slug.slice(0, slug.lastIndexOf('-'));

  const postRef = doc(firestore, `/Animals/`, sluged);
  animal = postToJSON(await getDoc(postRef));
  //   console.log(post);
  path = postRef.path;

  return {
    props: { animal, path },
    revalidate: 50000
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const collectionRef = collection(firestore, 'Animals');
  const snapshot = await getDocs(collectionRef);

  const paths = snapshot.docs.map((doc) => {
    const { RFID } = doc.data();
    const slug = RFID;
    // console.log('slug', slug);
    return {
      params: { slug }
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking'
  };
}

export default function Animals({ animal }) {
  return (
    <main className="m-5">
      <H3>
        <a href="#">Animals</a>
      </H3>
      <ul>
        <li>Notes</li>
      </ul>
      <div className="flex space-x-4">
        <Card className="flex-1" interactive={true} elevation={Elevation.ONE}>
          <H5>
            <a href="#">Animal Information</a>
          </H5>

          <div className="flex space-x-4 m-2">
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Animal ID"
              variant="standard"
              value={animal.ID}
            />
            <TextField
              className="flex-shrink"
              id="standard-basic"
              label="Study Number"
              variant="standard"
              value={animal.Study}
            />
            <TextField
              id="standard-basic"
              label="Study Start"
              variant="standard"
            />
          </div>
          <div className="flex space-x-4 m-2">
            <TextField
              className="flex-1"
              id="standard-basic"
              label="RFID"
              variant="standard"
              value={animal.RFID}
            />
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Gender"
              variant="standard"
              value={animal.Sex}
            />
            <TextField
              id="standard-basic"
              label="DOB"
              variant="standard"
              value={animal.BirthDate}
            />
          </div>
          <div className="flex space-x-4 m-2">
            <TextField
              id="standard-basic"
              label="Species"
              variant="standard"
              value={animal.Species}
            />
            <TextField
              id="standard-basic"
              label="Strain"
              variant="standard"
              value={animal.Strain}
            />
            <TextField
              id="standard-basic"
              label="Dead Date"
              variant="standard"
            />
          </div>
        </Card>
        <Card className="flex-1" interactive={true} elevation={Elevation.ONE}>
          <H5>
            <a href="#">Transplant Information</a>
          </H5>
          <div className="flex space-x-4 m-2">
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Transplant Date"
              variant="standard"
            />
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Age at transplant (weeks)"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Cell Source"
              variant="standard"
            />
          </div>
          <div className="flex space-x-4 m-2">
            <TextField
              id="standard-basic"
              label="Group"
              variant="standard"
              value={animal.Group}
            />
            <TextField
              id="standard-basic"
              label="Days post Transplant"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Planned perfusion date"
              variant="standard"
            />
          </div>
        </Card>
        <Card
          className="flex-shink"
          interactive={true}
          elevation={Elevation.TWO}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
          >
            <Link
              key="gotocurrentstudy"
              href={`/study/${animal.Study}`}
              passHref
            >
              <Button
                component="label"
                icon="projects"
                text="Receive Shipping Manifest"
              >
                Goto Current Study
              </Button>
            </Link>
          </ButtonGroup>
        </Card>
      </div>
      <div className="flex space-x-4 mt-4">
        <Card
          className="flex-1 flex-grow"
          interactive={true}
          elevation={Elevation.ONE}
        >
          <div className="flex space-x-4 mt-4">
            <TextField
              className="flex-1"
              id="outlined-multiline-flexible"
              label="Notes"
              multiline
              minRows={4}
            />
          </div>
          <p> </p>
        </Card>
      </div>
    </main>
  );
}
