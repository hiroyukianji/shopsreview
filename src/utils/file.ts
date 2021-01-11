
/**
 * 拡張子取得
 * @param path ファイル名
 */
export const getExtention = (path:string) => {
  return path.split(".").pop();  
}