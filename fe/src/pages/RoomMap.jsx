import React, { useRef, useEffect, useState } from "react";
import { Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquarePen,
    faTrashAlt,
    faSquarePlus,
    faDesktop,
    faCouch,
    faRectangleList,
} from "@fortawesome/free-solid-svg-icons";

import checkRole from "../utils/checkRole";
import Layout from "../components";
import "../styles/share.css";
import {
    listRoom,
    updateRoom,
    listBranch,
    deleteRoom,
    listFac,
    listHis,
    listMap,
} from "../utils/services";
import RoomFrame from "../components/popup/room/RoomFrame";

const RoomMap = () => {
    // console.log(localStorage.role)
    const [value, setValue] = useState();
    const getList = async () => {
        checkRole();
        const data = { keyword: "", idBranch: JSON.parse(localStorage.getItem('user')).idBra };
        // console.log(data)
        const rs = await listRoom(data);
        if (!rs.status) {
            return;
        } else {
            setValue(rs.data);
            // console.log(rs.data);
        }
    };

    useEffect(() => {
        getList()
    }, [])
    return (
        <Layout
            title="Danh sách phòng chiếu"
            pos={localStorage.role === "PS00000003" ? "Nhân viên" : "Giám sát"}
        >
            <div className="frame">
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', gap: "70px", width: "60%", height: "80%", overflowY: "auto" }}>
                    {
                        value?.map((item, index) => (
                            item.idStatus === 1 ? (
                                <RoomFrame key={index} data={item} color={'gray'}/>
                            ) : (item.idStatus === 2 ? (<RoomFrame key={index} data={item} color={'yellow'}/>) : (item.idStatus === 3 ? (<RoomFrame key={index} data={item} color={'red'}/>) : <RoomFrame key={index} data={item} color={'green'}/>))
                        ))
                    }

                </div>
            </div>
        </Layout>
    );
};

export default RoomMap;
