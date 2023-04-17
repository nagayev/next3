import s3 from '../../s3'

export default async (req, res) => {
  try{
    const fileData = await s3.S3Download('animals.json','/tmp/animals.json'); //сохраняем файл по временному пути, потому что нет прав на запись
    const fileContent = fileData.data.Body.toString('utf-8');
    const arr = JSON.parse(fileContent);
    res.status(200).send(JSON.stringify(arr));
  }
  catch(e){
    console.log(e);
    res.status(200).send("[]");
  }
};
 
 
