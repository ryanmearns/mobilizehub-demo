'use client'

import { Petition } from '@/payload-types'
import { type Country } from '@mobilizehub/payload-plugin/helpers'
import { signPetition } from '@mobilizehub/payload-plugin/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../ui/field'
import { Input } from '../ui/input'
import { Progress } from '../ui/progress'
import { RichText } from '../ui/richtext'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export function PetitionTemplate({
  id,
  headline,
  legend,
  content,
  target,
  ask,
  goal,
  contactFields,
  submitButtonLabel,
  countries,
  signatureCount = 0,
}: Petition & { countries: Country[]; signatureCount?: number }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)

  const progressPercentage = goal ? Math.min((signatureCount / goal) * 100, 100) : 0

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      function transformCheckboxData(data: Record<string, unknown>) {
        return Object.fromEntries(
          Object.entries(data).map(([key, value]) => {
            if (value === 'on') {
              return [key, true]
            }
            if (value === 'off') {
              return [key, false]
            }
            return [key, value]
          }),
        )
      }

      const formData = new FormData(e.target as HTMLFormElement)
      const data = transformCheckboxData(Object.fromEntries(formData))
      await signPetition({
        petitionId: id,
        data,
        opts: {
          onRedirect: (redirect) => {
            window.location.href = redirect
          },
          onMessage: (message) => {
            if (typeof message === 'string') {
              toast.success(message)
              formRef.current?.reset()
            } else {
              toast.success('Thank you for signing!')
              formRef.current?.reset()
            }
          },
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-primary text-center text-4xl font-bold tracking-tight md:text-5xl">
              {headline}
            </h2>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-24">
        <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:gap-24">
          <div className="flex-1 space-y-6">
            {goal && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{signatureCount.toLocaleString()} signatures</span>
                  <span className="text-muted-foreground">Goal: {goal.toLocaleString()}</span>
                </div>
                <Progress value={progressPercentage} />
              </div>
            )}

            {content && <RichText data={content as SerializedEditorState} />}
          </div>

          <div className="h-fit flex-1 space-y-8 rounded-lg border p-8">
            <div className="space-y-4">
              {target && (
                <div>
                  <p className="text-lg font-semibold">{target}</p>
                </div>
              )}

              {ask && (
                <div>
                  <p className="text-lg italic">{ask}</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} ref={formRef}>
              <FieldGroup>
                <FieldLegend className="font-bold">{legend}</FieldLegend>

                <FieldSet>
                  {contactFields?.map((field) => {
                    switch (field.blockType) {
                      case 'email':
                        return (
                          <Field key={field.blockType}>
                            <FieldLabel htmlFor={field.blockType}>{field.label}</FieldLabel>
                            <Input
                              id={field.blockType}
                              name={field.blockType}
                              type="email"
                              required={!!field.required}
                            />
                          </Field>
                        )
                      case 'firstName':
                        return (
                          <Field key={field.blockType}>
                            <FieldLabel htmlFor={field.blockType}>{field.label}</FieldLabel>
                            <Input
                              id={field.blockType}
                              name={field.blockType}
                              type="text"
                              required={!!field.required}
                            />
                          </Field>
                        )
                      case 'lastName':
                        return (
                          <Field key={field.blockType}>
                            <FieldLabel htmlFor={field.blockType}>{field.label}</FieldLabel>
                            <Input
                              id={field.blockType}
                              name={field.blockType}
                              type="text"
                              required={!!field.required}
                            />
                          </Field>
                        )
                      case 'address':
                        return (
                          <Field key={field.blockType}>
                            <FieldLabel htmlFor={field.blockType}>{field.label}</FieldLabel>
                            <Input
                              id={field.blockType}
                              name={field.blockType}
                              type="text"
                              required={!!field.required}
                            />
                          </Field>
                        )
                      case 'city':
                        return (
                          <Field key={field.blockType}>
                            <FieldLabel htmlFor={field.blockType}>{field.label}</FieldLabel>
                            <Input
                              id={field.blockType}
                              name={field.blockType}
                              type="text"
                              required={!!field.required}
                            />
                          </Field>
                        )
                      case 'zip':
                        return (
                          <Field key={field.blockType}>
                            <FieldLabel htmlFor={field.blockType}>{field.label}</FieldLabel>
                            <Input
                              id={field.blockType}
                              name={field.blockType}
                              type="text"
                              required={!!field.required}
                            />
                          </Field>
                        )
                      case 'country':
                        return (
                          <Field key={field.blockType}>
                            <FieldLabel htmlFor={field.blockType}>{field.label}</FieldLabel>
                            <Select name={field.blockType} required={!!field.required}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {countries.map((country) => (
                                    <SelectItem key={country.value} value={country.value}>
                                      {country.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </Field>
                        )
                      case 'emailOptIn':
                        return (
                          <Field key={field.blockType} orientation="horizontal">
                            <Checkbox id={field.blockType} name={field.blockType} defaultChecked />
                            <FieldLabel htmlFor={field.blockType} className="font-normal">
                              {field.label}
                            </FieldLabel>
                          </Field>
                        )
                      case 'state':
                        return (
                          <Field key={field.blockType}>
                            <FieldLabel htmlFor={field.blockType}>{field.label}</FieldLabel>
                            <Input
                              id={field.blockType}
                              name={field.blockType}
                              type="text"
                              required
                            />
                          </Field>
                        )
                      case 'mobileNumber':
                        return (
                          <Field key={field.blockType}>
                            <FieldLabel htmlFor={field.blockType}>{field.label}</FieldLabel>
                            <Input
                              id={field.blockType}
                              name={field.blockType}
                              type="text"
                              required
                            />
                          </Field>
                        )
                      case 'mobileOptIn':
                        return (
                          <Field key={field.blockType} orientation="horizontal">
                            <Checkbox id={field.blockType} name={field.blockType} defaultChecked />
                            <FieldLabel htmlFor={field.blockType} className="font-normal">
                              {field.label}
                            </FieldLabel>
                          </Field>
                        )
                      default:
                        return null
                    }
                  })}
                </FieldSet>

                <Field orientation="vertical">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                    {isSubmitting ? 'Signing...' : submitButtonLabel || 'Sign this petition'}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
