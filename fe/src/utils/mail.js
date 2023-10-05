export default function uploadImg(file) {
  var form = new FormData();
  form.append("image", file);
  return fetch(
    "https://api.imgbb.com/1/upload?key=1c3b6a6b80b4eb641ae9ea43c4aa5da6",
    {
      method: "POST",
      mimeType: "multipart/form-data",
      contentType: false,
      body: form,
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res.data.image.url);
      return res.data.image.url;
    });
}
