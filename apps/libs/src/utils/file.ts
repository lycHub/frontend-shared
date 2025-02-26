import { UploadFile } from "antd";

const AcceptFileTypes = {
  image: ['png', 'jpg', 'jpeg', 'webp'],
  excel: ['vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.ms-excel'],
  word: ['msword', 'vnd.openxmlformats-officedocument.wordprocessingml.document'],
  pdf: ['pdf'],
  apk: ['apk', 'vnd.android.package-archive'],
  video: ['mp4']
}

function fileExtensionName(file: string | UploadFile) {
  if (typeof file === 'string') {
    return file.replace(/.+\./, "");
  }
  return file.type?.split('/').pop() || '';
}

function getFileType(file: string | UploadFile) {
  const extension = fileExtensionName(file);
  const target = Object.entries(AcceptFileTypes).find(item => item[1].includes(extension));
  return target?.[0];
}

function checkFileType(file: UploadFile, types: (keyof typeof AcceptFileTypes)[]) {
  const fileTypeSuffix = file.type?.split('/').pop();
  const acceptTypes = types.map(key => AcceptFileTypes[key]).flat();
  if (fileTypeSuffix && acceptTypes) {
    return acceptTypes.includes(fileTypeSuffix);
  }
  return false;
}

// maxSize单位MB
function checkFileSize(file: UploadFile, maxSize = 0) {
  return (file.size || 0) <= (maxSize * 1024 * 1024);
}

export {
  getFileType,
  AcceptFileTypes,
  checkFileType,
  checkFileSize
}
