// searchUtils.ts

export const saveSearchTerm = (term: string) => {
    localStorage.setItem('searchTerm', term);
  };
  
  export const getSearchTerm = (): string => {
    return localStorage.getItem('searchTerm') || '';
  };
  