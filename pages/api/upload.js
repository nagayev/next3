import formidable from "formidable";
import s3 from "../../s3";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm(); //получаем объект формы
  form.parse(req, async function (err, fields, files) {
    try{
      await saveFile(files.file);
    }
    catch(e){
      console.log('Ошибка: ',e);
    }
    return res.status(201).send("Nothing");
  });
};

const saveFile = async (file) => {
  //Сохраняем в S3
  await s3.S3Upload(file.filepath,file.originalFilename);
  //fs.writeFileSync(`./public/${file.originalFilename}`, data);
  //Такое сохранение файла не работает, потому что у нас нет права записывать файлы по пути ./public
  await fs.unlinkSync(file.filepath); //Удаление временного файла
  return;
};

export default (req, res) => {
  if (req.method === "POST") post(req,res);
  else res.status(200).send("Invalid method, use POST")
};
 
