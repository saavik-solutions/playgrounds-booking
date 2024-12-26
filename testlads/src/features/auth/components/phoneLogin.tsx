"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'



const PhoneOtpFrom = () => {
    const [phoneNumber, setPhoneNumber] = useState()
    const handlePhoneNumber = (target) => {
        setPhoneNumber(target.value)
    }
  return (
      <div className='space-y-4'>
          <form onSubmit={() => { }}>
              <div className="space-y-2">
                  <Label
                      className='font-bold text-lg ml-1'
                      htmlFor='phone'>Mobile Number
                  </Label>
                  <Input
                      id='phone'
                      type='tel'
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  placeholder='Enter Phone Number'
              />
                   <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        variant={'default'}
      >
       
        Submit
      </Button>
              </div>
          </form>
    </div>
  )
}
export default PhoneOtpFrom;