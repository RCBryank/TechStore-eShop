import { ConvertoDateTimeFormat } from "@/hooks/use-datetimeformat";
import { useEffect, useState } from "react"
import ProductComment from "../product-comment";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types";

export default function ProductViewComments({ idproduct }: { idproduct: number }) {

    const page = usePage<SharedData>();
    const { auth } = page.props;

    const [Comments, setComments] = useState([]);

    const [OrderBy, setOrderBy] = useState("desc");

    const [TotalPages, setTotalPages] = useState(0);
    const [CurrentPage, setCurrentPage] = useState(1);


    type Comment = {
        ID: number,
        Name: string,
        Message: string,
        DatePublish: string,
        ID_WebUser: number
    }

    useEffect(() => {
        fetch('/product/' + idproduct + '/comments/' + OrderBy + '/' + CurrentPage).then(response => response.json()).then(data => {
            setTotalPages(data.last_page);
            setComments(data.data);
        })
    }, [OrderBy, CurrentPage]);


    function DeleteComment(idcomment: number) {
        let _array = Comments.filter(item => item.ID != idcomment);
        setComments(_array);
    }

    return (
        <>
            {/* Ordenar */}
            <div className='flex justify-between mb-6'>
                <p className='flex-auto'>Comentarios</p>
                <div className='flex-1/5 text-right'>
                    <button className='mx-2 cursor-pointer' onClick={() => setOrderBy("desc")}>Más Recientes</button>
                    <button className='mx-2 cursor-pointer' onClick={() => setOrderBy("asc")}>Más Antiguos</button>
                </div>
            </div>

            {/* Container Comentarios */}
            <div className='flex flex-col gap-4 mb-9'>
                {/* Comentario Template */}
                {Comments.map((comment: Comment) => {
                    return (
                        <>
                            <ProductComment key={comment.ID} deletefunction={DeleteComment} idcomment={comment.ID} message={comment.Message} username={comment.Name} date={comment.DatePublish} isauth={(auth.user != null && comment.ID_WebUser == auth.user.ID)} profilepicture="/build/images/Logo.png" />
                        </>
                    )
                })}
            </div>

            {/* Paginacion */}
            <div className='flex justify-center'>
                {
                    Array.from(Array(TotalPages).fill().map((x, i) => i + 1)).map((item) => {
                        if (TotalPages >= 5 && item == 1) {
                            return <p onClick={(e) => setCurrentPage(item)} className={'cursor-pointer px-1 select-none hover:text-red-700 ' + (item == CurrentPage ? 'text-red-900 font-bold' : '')}>{item}... </p>
                        }
                        else if (TotalPages >= 5 && item == TotalPages) {
                            return <p onClick={(e) => setCurrentPage(item)} className={'cursor-pointer px-1 select-none hover:text-red-700 ' + (item == CurrentPage ? 'text-red-900 font-bold' : '')}> ...{item}</p>
                        } else if (item == CurrentPage) {
                            return <p onClick={(e) => setCurrentPage(item)} className={'cursor-pointer px-1 select-none hover:text-red-700 ' + (item == CurrentPage ? 'text-red-900 font-bold' : '')}>{item}</p>
                        }
                        else if ((item == (CurrentPage - 1) || item == (CurrentPage + 1)) || (CurrentPage < 3 && item < 5) || (CurrentPage > (TotalPages - 3) && item > (TotalPages - 4))) {
                            return <p onClick={(e) => setCurrentPage(item)} className="cursor-pointer select-none px-1 hover:text-red-700 ">{item}</p>
                        }

                    })
                }
            </div>
        </>
    )
}

/**DROP PROCEDURE IF EXISTS TestSP;

DELIMITER //

CREATE PROCEDURE TestSP(InitMsg int, EndMsg int)
BEGIN
    SET @Msg = InitMsg;
    SET @End= @Msg + EndMsg;
    looptest: LOOP
        SET @Minute = FLOOR(@Msg / 60);
        SET @Seconds = @Msg - (@Minute * 60);
        
        SET @Date = CONCAT('2025-06-09 09:', LPAD(CAST(@Minute as CHARACTER), 2, '0') ,':', LPAD(CAST(@Seconds as CHARACTER), 2, '0'));
        INSERT INTO productcomment (Message, ID_Product, ID_WebUser, created_at, updated_at) VALUES (CONCAT("Message ", @Msg), 2, 17, @Date, @Date);
        SET @Msg = @Msg + 1;
        IF @Msg = @End THEN
            LEAVE looptest;
        END IF;
    END LOOP;
    
    SELECT @Seconds;
END; //

DELIMITER ;

CALL TestSP(0,200);
 */