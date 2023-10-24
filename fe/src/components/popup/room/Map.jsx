import React from 'react'
import ColorToggleButton from './ColorToggleButton'

const Map = (props) => {
    const mapList = (row) => {
        return props.map.filter(item => {
            return item.idRow === row;
        }
        )
    }
    return (
        <div>
            <div style={{ marginLeft: "10px", width:"100%", height:'20vh', overflowY:'auto', overflowX:'auto' }}>
                {
                    props.item.row >= 1 ? (<div className="row">
                        <button className="btn-row">A</button>
                        {mapList("A").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 2 ? (<div className="row">
                        <button className="btn-row">B</button>
                        {mapList("B").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 3 ? (<div className="row">
                        <button className="btn-row">C</button>
                        {mapList("C").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 4 ? (<div className="row">
                        <button className="btn-row">D</button>
                        {mapList("D").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 5 ? (<div className="row">
                        <button className="btn-row">E</button>
                        {mapList("E").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 6 ? (<div className="row">
                        <button className="btn-row">F</button>
                        {mapList("F").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 7 ? (<div className="row">
                        <button className="btn-row">G</button>
                        {mapList("G").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 8 ? (<div className="row">
                        <button className="btn-row">H</button>
                        {mapList("H").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 9 ? (<div className="row">
                        <button className="btn-row">I</button>
                        {mapList("I").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 10 ? (<div className="row">
                        <button className="btn-row">J</button>
                        {mapList("J").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 11 ? (<div className="row">
                        <button className="btn-row">K</button>
                        {mapList("K").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 12 ? (<div className="row">
                        <button className="btn-row">L</button>
                        {mapList("L").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 13 ? (<div className="row">
                        <button className="btn-row">M</button>
                        {mapList("M").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 14 ? (<div className="row">
                        <button className="btn-row">N</button>
                        {mapList("N").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 15 ? (<div className="row">
                        <button className="btn-row">O</button>
                        {mapList("O").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 16 ? (<div className="row">
                        <button className="btn-row">P</button>
                        {mapList("P").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 17 ? (<div className="row">
                        <button className="btn-row">Q</button>
                        {mapList("Q").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 18 ? (<div className="row">
                        <button className="btn-row">R</button>
                        {mapList("R").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 19 ? (<div className="row">
                        <button className="btn-row">S</button>
                        {mapList("S").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 20 ? (<div className="row">
                        <button className="btn-row">T</button>
                        {mapList("T").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 21 ? (<div className="row">
                        <button className="btn-row">U</button>
                        {mapList("U").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 22 ? (<div className="row">
                        <button className="btn-row">V</button>
                        {mapList("V").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 23 ? (<div className="row">
                        <button className="btn-row">W</button>
                        {mapList("W").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 24 ? (<div className="row">
                        <button className="btn-row">X</button>
                        {mapList("X").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 25 ? (<div className="row">
                        <button className="btn-row">Y</button>
                        {mapList("Y").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
                {
                    props.item.row >= 26 ? (<div className="row">
                        <button className="btn-row">Z</button>
                        {mapList("Z").map((item, index) => (
                            <ColorToggleButton
                                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                                item={item}
                            />
                        ))}
                    </div>) : null
                }
            </div>
        </div>
    )
}

export default Map
