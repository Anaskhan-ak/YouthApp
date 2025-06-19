import { useEffect, useState } from 'react';
import PostModal from '../../../../components/modals/postModal';
import { getDataLocally } from '../../../../helper';
import { apiCall } from '../../../../services/apiCall';
import AudioPosts from './AudioPosts';
import EventPosts from './EventPosts';
import FilePosts from './FilePosts';
import MediaPosts from './MediaPosts';
import MomentPosts from './MomentPosts';
import { toast } from '../../../../components/toast';
import { useIsFocused } from '@react-navigation/native';

const PostContentModal = ({options, setOptions}) => {
  const currentType = options.find(opt => opt.active)?.type;
  const [data, setData] = useState([]);
  const [yudios, setYudios] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const userDetails = await getDataLocally();
      const body = {
        userId: userDetails?.id,
        page: 1,
        pageSize: 50,
      };

      try {
        const response = await apiCall?.getAllPosts(body)
        setData(response?.data?.posts || []);
      } catch (error) {
        console.error('Error fetching posts', error);
        setData([]);
        toast('error', 'Error fetching posts');
      }
    };

     const fetchYudios = async () => {
      const userDetails = await getDataLocally();
      const body = {
        userId: userDetails?.id,
        page: 1,
        pageSize: 50,
      };

      try {
        const response = await apiCall?.getAllYudios(body)
        setYudios(response || []);
      } catch (error) {
        console.error('Error fetching yudios', error);
        setYudios([]);
        toast('error', 'Error fetching yudios');
      }
    };

    fetchPosts();
    fetchYudios()
  }, []);

  let content;
  switch (currentType) {
    // audios   moments  files   events
    case 'gallery':
      content = <MediaPosts posts={data?.filter(post => post?.type === 'MEDIA')}/>;
      break;
    case 'audios':
      content = <AudioPosts posts={yudios}/>;
      break;
    case 'moments':
      content = <MomentPosts posts={data?.filter(post => post?.type === 'MOMMENT')}/>;
      break;
    case 'files':
      content = <FilePosts posts={data?.filter(post => post?.type === 'DOCUMENT')}/>;
      break;
    case 'events':
    default:
      content = <EventPosts posts={data?.filter(post => post?.type === 'EVENT')}/>;
      break;
  }

  return (
    <PostModal options={options} setOptions={setOptions} content={content} />
  );
};

export default PostContentModal;
