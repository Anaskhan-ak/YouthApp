import PostModal from "../../../../components/modals/postModal";
import AudioPosts from "./AudioPosts";
import EventPosts from "./EventPosts";
import FilePosts from "./FilePosts";
import MediaPosts from "./MediaPosts";
import MomentPosts from "./MomentPosts";

const PostContentModal = ({options, setOptions}) => {
  const currentType = options.find(opt => opt.active)?.type;

  let content;
  switch (currentType) {
    // audios   moments  files   events
    case 'gallery':
      content = <MediaPosts />;
      break;
    case 'audios':
      content = <AudioPosts />;
      break;
    case 'moments':
      content = <MomentPosts />;
      break;
    case 'files':
      content = <FilePosts  />;
      break;
    case 'events':
    default:
      content = <EventPosts />;
      break;
  }

  return (
    <PostModal
      options={options}
      setOptions={setOptions}
      content={content}
    />
  );
};

export default PostContentModal;
