"use client";

import Image from "next/image";
import { useAppSelector } from "@/store";
import { LocationIcon } from "@/icons/Icons";
import { FormData } from "@/store/features/formStateSlice";

type Props = { data?: FormData[] };

export default function UserList({ data }: Props) {
  // expecting data prop as the data submitted by Post request
  let newData;
  const users = useAppSelector((state) => state.formStateReducer.userData);
  newData = data ? data : users;

  return (
    <div className=" flex flex-col gap-2">
      <p className="font-medium">User logs</p>
      <div className="flex flex-col gap-1">
        {newData?.map((ele, i) => (
          <div
            key={i}
            className="bg-white  p-4 rounded-lg flex justify-between gap-4 border flex-col sm:flex-row sm:items-center transition-all hover:bg-lightPrimary hover:cursor-pointer "
          >
            <Image
              // converting blob to base64 to display the image
              // also expecting the img url if fetched
              height={64}
              width={64}
              src={URL.createObjectURL(ele.photo)}
              alt="user iMage"
              className=" aspect-auto1/1 h-16 w-16 object-contain rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="flex gap-2 items-center  break-all ">
                {ele.deviceid}
              </p>

              <div className="flex gap-2 items-center text-gray-400 text-sm">
                <LocationIcon />
                {ele.lat}, {ele.log}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
