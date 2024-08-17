import { SystemText } from '@components/system-fonts/text'
import useMutationHookExample from '@hooks/example/useMutationHookExample'
import useQueryHookExample from '@hooks/example/useQueryHookExample'
import { useTranslation } from 'react-i18next'
function Home() {
    // Example for translation
    const { t } = useTranslation()
    // Mutate Example
    const { isPending: isLoadingMutate, mutateAsync: functionToMutate } = useMutationHookExample()

    // Query Example
    const { isLoading, data, refetch } = useQueryHookExample()

    console.log(isLoadingMutate, isLoading, refetch, functionToMutate, data);

    return (
        <SystemText variant='h3'>{t('example_header')}</SystemText>
    )
}

export default Home