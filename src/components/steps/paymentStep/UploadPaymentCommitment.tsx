import { useState } from "react";
import Icon from "../../UI/Icon";
import styles from "./UploadPaymentCommitment.module.css";
import FileNameTag from "./FileNameTag";

type Props = {
  handleFileLoad: (file: File | null) => void;
};

const UploadPaymentCommitment = ({ handleFileLoad }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      handleFileLoad(file);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    handleFileLoad(null);
  };

  return (
    <div>
      <div
        className={styles.container}
        onClick={() => {
          const fileInput = document.getElementById("fileInput");
          fileInput?.click();
        }}
      >
        <Icon src='attach-file' size={50} />
        <p>Arrastra la imagen o adjuntala aqui</p>
        <input
          id='fileInput'
          type='file'
          className={styles.uploadInput}
          accept='.pdf, .jpg, .jpeg, .png'
          style={{ display: "none" }}
          onChange={handleAddFile}
        />
      </div>
      <div className={`${!file ? "hidden" : "visible"}`}>
        <FileNameTag
          fileName={file?.name || ""}
          handleRemoveFile={handleRemoveFile}
        />
      </div>
    </div>
  );
};

export default UploadPaymentCommitment;
