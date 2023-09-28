type ResourcesHTTP = ReturnType<typeof import('./index').createResourcesHTTP>

interface ResourceHTTP<T extends Array<any> = DatedSingleValueData[]> {
  fetch: VoidFunction
  values: ASS<T | null>
  loading: ASS<boolean>
  url: URL
}
