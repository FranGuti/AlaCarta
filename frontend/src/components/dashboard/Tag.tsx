import { ImCancelCircle } from 'react-icons/im'

const Tag = ({ title, customComponents }: { title: string, customComponents: string }) => {


    return (
        <div className={`pb-0 w-fit pl-2 pr-2 pt-0.5 rounded-xl text-center ${customComponents} text-white font-bold`}>
            {title.length > 50 ? (
                <div className='text-left overflow-ellipsis'>
                    {title}
                </div>
            ) : (
                title
            )}
        </div>
    )
}

const EditTag = ({ title, customComponents, onCancelClick }: { title: string, customComponents: string, onCancelClick?: () => void }) => {


    return (
        <div className={` flex gap-2  w-fit px-3 py-1 text-lg rounded-full text-left ${customComponents} text-white `}>
            {title.length > 50 ? (
                <div className='text-left'>
                    {title.slice(0, title.length / 2)}
                    <br />
                    {title.slice(title.length / 2)}
                </div>
            ) : (
                title
            )}
            <div className='mt-1.5'>
            <div className='ml-3 scale-125 hover:scale-150 transition-transform cursor-pointer' onClick={onCancelClick}>
                {<ImCancelCircle />}
            </div>
            </div>

        </div>
    )
}

export { EditTag, Tag };