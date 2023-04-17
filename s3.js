/*
 Вспомогательный файл для работы с S3
 Здесь конфигурируется S3 и объявлены функции для работы
*/
const EasyYandexS3 = require('easy-yandex-s3').default;
const path = require('path');

var s3 = new EasyYandexS3({
  auth: {
    accessKeyId: 'YCAJENwDDnY2eFq8URK71vfNA',
    secretAccessKey: 'YCN2JIt8Y2oGOFvTM-W2cmiZTIpDKXMUoLYIxnrs',
  },
  Bucket: 'marat-bucket',
  debug: false
});

module.exports.S3Upload = async function S3Upload(filename,original){
    return await s3.Upload(
    {
    path: path.resolve(__dirname, filename),
    name: original
    },
    '/'
    );
}

module.exports.S3Download = async function S3Download(filename, saveAs){
    return await s3.Download(filename, saveAs);
}
