import formidable from 'formidable-serverless';
import fs from 'fs';
import ParseStudy from '../../util/ParseStudy';

export const config = {
  api: {
    bodyParser: false
    // externalResolver: true
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  //   console.log('just before parse');
  form.parse(req, async function (err, fields, files) {
    // console.log('==starting parse==');
    const theData = await saveFile(files.file);
    // console.log(`=====post=====`);
    const retJson = await ParseStudy(`./public/${files.file.name}`);
    // console.log(`=====back from parse=====`);
    // console.log(retJson);
    // console.log(`=====pre res send=====`);
    const boy = async () => {
      //   console.log(`=====in boy=====`);
      //   console.log('retJson', await retJson);
      //   console.log(`=====in boy next is res=====`);
      res.status(200).json(await retJson);
    };
    // console.log(`=====preboy=====`);
    boy();
    // res.status(201).json(retJson);
    // res.status(200).json({ name: 'John Doe' });
    // setTimeout((retJson) => {
    // }, 4000);
  });
};

const saveFile = async (file) => {
  //   console.log('made it to save');
  //   console.log(file);
  //   console.log(file.path);
  const data = fs.readFileSync(file.path);
  //   console.log(`=====readFileSync=====`);
  //   console.log(data);
  fs.writeFileSync(`./public/${file.name}`, data);
  await fs.unlinkSync(file.path);

  //   console.log(`=====savefile=====`);
  //   console.log(`parsed ${retJson.length}`);
  //   return retJson;
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    post(req, res);
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}

// export default (req, res) => {
//   req.method === 'POST'
//     ? post(req, res)
//     : req.method === 'PUT'
//     ? console.log('PUT')
//     : req.method === 'DELETE'
//     ? console.log('DELETE')
//     : req.method === 'GET'
//     ? console.log('GET')
//     : res.status(404).send('');
// };
