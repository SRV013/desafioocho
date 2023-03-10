import React, { useState } from "react";
import { Input, TextArea } from "ui/input_text/";
import { Button } from "ui/button";
import { LoadingSpinner } from "pages/spinner";
import { MapboxSeach } from "components/MapBox/mapbox";
import styles from "./index.css";
import { petNew } from "lib/pet";
import { MyPetImg } from "./dropzone";
import { useNavigate } from "react-router-dom";
import { myToken, usermyId, pictureId, mypetLocation } from "atoms";
import { useRecoilState } from "recoil";
import { myModal } from "hooks";
export function MyPetForm() {
    const picture = useRecoilState(pictureId);
    const my_Token = useRecoilState(myToken);
    const idUser = useRecoilState(usermyId);
    const [coords] = useRecoilState(mypetLocation);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setVisible] = myModal();
    async function pet(e) {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const sobremi = e.target.sobremi.value;
        const publicado = e.target["publicada"].checked;
        const perdido = e.target["perdida"].checked;
        const pictureURL = picture[0];
        const lat = coords[0];
        const lng = coords[1];
        setIsLoading(true);
        if (nombre && sobremi && pictureURL && lat && lng) {
            petNew(my_Token, idUser, {
                nombre,
                sobremi,
                publicado,
                perdido,
                pictureURL,
                lat,
                lng,
            }).then(() => {
                setIsLoading(false);
                navigate("/pet_list");
            });
        } else {
            window.alert("Error : datos incompletos ");
        }
    }
    return (
        <>
            {isVisible ? <MapboxSeach /> : null}
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <form onSubmit={pet} className={styles["__container"]}>
                    <MyPetImg />
                    <Input
                        type={"text"}
                        name={"nombre"}
                        placeholder="nombre"
                        required></Input>
                    <TextArea
                        type="textarea"
                        name="sobremi"
                        placeholder="sobre mi"
                        required></TextArea>
                    <div
                        className={styles["ubicacion"]}
                        onClick={() => setVisible(!isVisible)}>
                        <img src="../src/assets/ubicacion.png" />
                        <a>{coords ? `Modificar` : `Agregar Ubicacion`} </a>
                    </div>
                    <label>
                        <input type="checkbox" name="publicada" />
                        Publicar Mascota
                    </label>
                    <label>
                        <input type="checkbox" name="perdida" />
                        Marcar Como Perdida
                    </label>
                    <Button type="button" name={"save"}>
                        Guardar
                    </Button>
                </form>
            )}
        </>
    );
}
