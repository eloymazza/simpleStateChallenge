import Tag from "../../UI/Tag";
import styles from "./FileNameTag.module.css";

type Props = {
  fileName: string;
  handleRemoveFile: () => void;
};

const FileNameTag = ({ fileName, handleRemoveFile }: Props) => {
  return (
    <Tag color='lightgreen' size='small' radius='small'>
      <div className={styles.fileTagContainer}>
        <p className={styles.fileTag}>{fileName}</p>
        <span className={styles.clearTagButton} onClick={handleRemoveFile}>
          x
        </span>
      </div>
    </Tag>
  );
};

export default FileNameTag;
