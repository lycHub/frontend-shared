// 不可用
const AcceptFileTypes = {
  image: ["png", "jpg", "jpeg", "webp"],
  excel: [
    "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "vnd.ms-excel",
  ],
  word: [
    "msword",
    "vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  pdf: ["pdf"],
  apk: ["apk", "vnd.android.package-archive"],
  video: ["mp4"],
};

function fileExtensionName(file: File) {
  return file.type?.split("/").pop() || "";
}

function getFileType(file: File) {
  const extension = fileExtensionName(file);
  const target = Object.entries(AcceptFileTypes).find((item) =>
    item[1].includes(extension)
  );
  return target?.[0];
}

function checkFileType(file: File, types: (keyof typeof AcceptFileTypes)[]) {
  const fileTypeSuffix = file.type?.split("/").pop();
  const acceptTypes = types.map((key) => AcceptFileTypes[key]).flat();
  if (fileTypeSuffix && acceptTypes) {
    return acceptTypes.includes(fileTypeSuffix);
  }
  return false;
}

// maxSize单位MB
function checkFileSize(file: File, maxSize = 0) {
  return (file.size || 0) <= maxSize * 1024 * 1024;
}

export { getFileType, AcceptFileTypes, checkFileType, checkFileSize };
