import PostModal from "../../../components/modals/postModal";
import AudioComponent from "./audios";
import CameraComponent from "./camera";
import FilesComponent from "./files";
import Gallery from "./gallery";

const PostContentModal = ({ options, setOptions, setMedia, media }) => {
  const currentType = options.find(opt => opt.active)?.type;

  let content;
  switch (currentType) {
    case 'gallery':
      content = <Gallery media={media} setMedia={setMedia} />;
      break;
    case 'camera':
      content = <CameraComponent media={media} setMedia={setMedia} />;
      break;
    case 'audios':
      content = <AudioComponent media={media} setMedia={setMedia} />;
      break;
    case 'files':
    default:
      content = <FilesComponent media={media} setMedia={setMedia} />;
      break;
  }

  return (
    <PostModal
      options={options}
      setOptions={setOptions}
      setMedia={setMedia}
      content={content}
    />
  );
};

export default PostContentModal
