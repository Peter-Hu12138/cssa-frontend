'use client'

import { useEffect } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import type { UseTranslationOptions as UseTranslationOptionsOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

// 
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend(async (language: string, namespace: string) => {
    const resources = await import(`../../../messages/${language}.json`)
    return resources[namespace] || resources.default?.[namespace] || resources
  }))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['cookie', 'htmlTag', 'navigator'],
    },
    preload: runsOnServerSide ? languages : []
  })

export function useTranslation(
  lng: string | undefined,
  ns: string,
  options: UseTranslationOptionsOrg = {}
) {
  const ret = useTranslationOrg(ns, lng ? { ...options, lng } : options)
  const { i18n } = ret

  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return
    i18n.changeLanguage(lng)
  }, [lng, i18n])
  return ret
}
