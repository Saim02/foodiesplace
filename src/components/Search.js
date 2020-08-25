import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";

export default function Search() {
  useEffect(() => {}, []);

  return (
    <div>
      <AutoComplete size="large" palceholder="Search Recipe" />
    </div>
  );
}
