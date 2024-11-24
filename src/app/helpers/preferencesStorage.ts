// helpers/preferencesStorage.ts
export const savePreferences = (preferences: Record<string, any>) => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  };
  
  export const loadPreferences = (): Record<string, any> | null => {
    const data = localStorage.getItem("userPreferences");
    return data ? JSON.parse(data) : null;
  };