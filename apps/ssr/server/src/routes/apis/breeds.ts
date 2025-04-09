import request from "../../utils/request.js";

export function requestBreeds(req) {
  /* 
    todo: 用signedCookie鉴权
    console.log("req cookies>>>>", req.cookies["ssr-token"]);
  */

  const { id } = req.params;
  const fetch = id ? request.get("/breeds/" + id) : request.get("/breeds");
  return fetch.then(({ data }) => data);
}

export default (req, res) => {
  res.setHeader("Content-Type", "application/json");
  requestBreeds(req)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        data: error,
      });
    });
};
