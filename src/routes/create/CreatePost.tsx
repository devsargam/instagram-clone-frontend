import { Navigation } from '@/components/common';
import { CommentIcon, PostLikeIcon } from '@/components/icons';
import { axiosClient } from '@/lib/httpClient';
import { useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';

export function CreatePost() {
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState('');

  const postData = async () => {
    try {
      const formData = new FormData();

      files.map((file) => {
        formData.append('images', file);
      });
      formData.append('title', 'hii');
      formData.append('caption', caption);

      const res = await axiosClient.post('/posts/', formData);

      console.log(res);
    } catch (e) {
      console.log(e);
      toast('Something Wrong Happened');
    }
  };

  const urls = files.map((file) => URL.createObjectURL(file));

  return (
    <main className="flex w-full">
      <Navigation />
      <div className="flex w-full gap-5 flex-col-reverse md:flex-row md:justify-around items-center">
        {/* Post Creation Section */}
        <div className="flex md:justify-center bg-gray-950 w-full sm:w-96 flex-col px-5 rounded-lg">
          {/* Caption */}
          <label htmlFor="caption" className="font-bold">
            Caption
          </label>
          <input
            id="caption"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.currentTarget.value)}
            className="bg-gray-900 text-gray-300 text-sm p-1 w-full rounded-sm border-none focus:ring-transparent"
          />
          {/* Images */}
          <label htmlFor="images" className="font-bold">
            Images
          </label>
          <ImageFileInput
            onFilesChange={(selectedFiles) => setFiles(selectedFiles)}
          />

          <button onClick={postData}>Submit</button>
        </div>
        {/* Post Preview Section */}
        <div>
          {/* PART 1 */}
          <div className="rounded overflow-hidden border-gray-800 border w-11/12 mx-auto md:min-w-[30rem] lg:w-4/12 md:w-6/12 bg-black sm:mx-3 md:mx-0 lg:mx-0  my-1 flex flex-col">
            <div className="w-full flex justify-between p-3">
              <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                {/* <img src={author.displayPictureUrl} alt="profilepic" /> */}
              </div>
              <span className="pt-1 ml-2 font-bold text-sm">
                {/* {author.username} */}
                Sargam
              </span>
            </div>
            {urls.length ? (
              <Carousel emulateTouch showThumbs={false}>
                {urls.map((url, i) => (
                  <img
                    src={url}
                    className="w-full bg-cover select-none"
                    height={478}
                    width={478}
                    key={i}
                    alt={files[i].name}
                  />
                ))}
              </Carousel>
            ) : (
              <div className="md:w-[500px] w-[400px] aspect-square bg-gray-400"></div>
            )}
            <div className="px-3 pb-2">
              <div className="pt-2">
                <div className="pt-1 flex gap-2">
                  <button>
                    <PostLikeIcon isLiked={true} />
                  </button>
                  <button>
                    <CommentIcon />
                  </button>
                </div>{' '}
                <i className="far fa-heart cursor-pointer" />
                <span className="text-sm text-gray-400 font-medium">
                  1k likes
                </span>
              </div>
              <div className="pt-1">
                <div className="mb-2 text-sm">
                  {/* <NavLink
                    to={`/${author.username}`}
                    className="font-medium mr-2"
                  >
                    {author.username}
                  </NavLink> */}
                  {caption}
                </div>
              </div>
            </div>

            {/* PART 1 END */}
          </div>

          <div></div>
        </div>
      </div>
    </main>
  );
}

type Props = {
  onFilesChange(files: File[]): void;
};

const ImageFileInput = ({ onFilesChange }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        id="images"
        ref={ref}
        type="file"
        accept="image/*" // only accept image file types
        multiple // allow multiple images
        onChange={(e) => {
          // this gives us the data on what files are selected
          // however, it's of type `FileList` which is hard to modify.
          const fileList = e.target.files;
          // let's convert `FileList` into a `File[]`
          if (fileList) {
            const files = [...fileList]; // now we have `File[]` type
            // This only works on es6 version make sure to set your tsconfig.json "target" to "es6"
            onFilesChange(files);
          }
        }}
        className="bg-gray-100 hidden"
      />
      <button
        className="bg-blue-500 my-2 focus:bg-blue-600 hover:bg-blue-600 w-full p-1 rounded-md text-white transition-colors"
        onClick={() => ref.current?.click()}
      >
        Select from computer
      </button>
    </>
  );
};
