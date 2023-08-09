import React from "react";

export default function page() {
  const postUrl = "https://httpbin.org/post";
  return (
    <div>
      <form>
        <label>
          <input name="deviceid" type="text"></input>
        </label>
        <label>
          <input name="lat" type="text"></input>
        </label>
        <label>
          <input name="log" type="text"></input>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
