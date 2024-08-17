import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@material-tailwind/react';
import { TfiSearch } from "react-icons/tfi";


const SearchBox = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')

    const searchHandler = () => {
        navigate(`/?q=${query}`)
    }
    return (
        <>
            <div className="relative flex w-full max-w-[24rem]">
                <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    className='w-full rounded-[1rem] py-1 px-2 border-black border-[0.02rem]  outline-none'
                    placeholder="Search AJIO...."
                    
                />
                <Button
                    onClick={searchHandler}
                    size="sm"
                    
                    disabled={!query.length > 0}
                    className="!absolute right-1  bg-transparent"
                >
                    <TfiSearch size={20}  color={query.length > 0 ? "black" : "gray"} />
                </Button>
            </div>
        </>
    )
}

export default SearchBox