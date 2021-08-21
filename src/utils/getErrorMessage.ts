export default function getErrorMessage(value: string) {
    const isEmpty = !value.trim() && '내용을 입력해주세요.'
    const isTooLong = value.length > 50 && '50자 내로 입력해주세요.'

    return isEmpty || isTooLong;
}  