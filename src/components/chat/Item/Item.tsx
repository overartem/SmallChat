
function Item({ comment, author, removeComment }: { comment: string; author: string, removeComment: () => void }) {
  const authorInitials = author.substring(0, 2);

  return (
    <>
      <li className='relative shadow-lg px-4 py-8 mb-10 lg:mb-5 bg-[var(--theme-yellow-color)]'>
        <div className='author-block flex items-center absolute -top-7 left-0 lg:-left-8'>
          <p className='rounded-full font-medium bg-[var(--theme-bg-color)] overflow-hidden w-[54px] text-xl text-center p-3 text-white uppercase z-[2]'>
            {authorInitials}
          </p>
          <p className='author font-medium bg-[var(--theme-bg-color)] min-w-[150px] pr-4 pl-8 py-2 relative -left-4 z-[1]'>
            {author}
          </p>
        </div>
        <div className='user-message overflow-hidden break-all text-gray-600'>
          <p>{comment}</p>
        </div>
        <span
          className='remove-msg absolute -top-3 -right-3 bg-[var(--theme-bg-color)] rounded-full w-6 h-6 text-center text-sm pt-[2px] hover:cursor-pointer hover:bg-[var(--theme-bg-bt-default)] hover:text-white'
          onClick={removeComment}
        >
          X
        </span>
      </li>
    </>
  );
}

export default Item;
