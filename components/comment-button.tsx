'use client'

import { MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

const CommentButton = () => {
    return (
        <div className='inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse'>
            <Button
                variant='outline'
                className='rounded-none rounded-l-md shadow-none focus-visible:z-10'

            >
                <MessageCircle className={cn('fill-primary stroke-primary')} />
            </Button>
            <span className='bg-background dark:border-input dark:bg-input/30 flex items-center rounded-r-md border px-3 text-sm font-medium'>
                {45}
            </span>
        </div>
    )
}

export default CommentButton
