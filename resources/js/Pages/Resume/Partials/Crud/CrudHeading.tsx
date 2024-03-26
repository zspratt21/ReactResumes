export default function CrudHeading({text, empty}:{text:string, empty:boolean}){
    return (
        <h3 className={'text-lg font-medium text-gray-900 dark:text-gray-100 text-center bg-gray-300 dark:bg-gray-900 ' + (empty ? 'rounded-lg' : 'rounded-t-lg')}>{text}</h3>
    )
}
