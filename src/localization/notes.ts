const notesAndExtras = {
  en: {
    notes: {
      title: "Add Notes",
      subtitleOne: "Primary Notes",
      subtitleTwo: "Secondary Notes",
      note: "Note",
      details: "Date, Gravity, etc.",
      placeholder: "Add note here",
    },
    recipeForm: {
      login: "Login to Save Recipe",
      title: "Save Recipe",
      subtitle: "Enter a Recipe Name",
      submit: "Save Recipe",
    },
    changesForm: {
      login: "Save Changes to Recipe?",
      subtitle: "Recipe Name",
      submit: "Save Changes",
      saveAs: "Save as New Recipe",
    },
    alerts: {
      loginError:
        "You are not authorized to view this recipe, login or contact the recipe owner to make sure this is a public recipe.",
      notCurrentUser:
        "This is another user's recipe, you will need to make a copy to your account to save changes.",
    },
    private: "Private Recipe?",
    accountPage: {
      title: "Account",
      theme: {
        title: "Preferred Theme",
        light: "Light",
        dark: "Dark",
      },
      language: {
        title: "Preferred Language",
      },
      units: {
        title: "Preferred Units",
        metric: "Metric",
        us: "US",
      },
      myRecipes: "My Recipes",
      viewRecipe: "View Recipe",
      deleteRecipe: "Delete Recipe",
      buttonMessage: {
        register: "Don't have any account? Register now.",
        login: "Already have an account? Login here.",
      },
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      or: "OR",
    },
  },
  de: {
    notes: {
      title: "Notizen Hinzufügen",
      subtitleOne: "Primäre Notizen",
      subtitleTwo: "Sekundäre Notizen",
      note: "Notiz",
      details: "Datum, Dichte, etc.",
      placeholder: "Notiz hier einfügen",
    },
    recipeForm: {
      login: "Anmelden um das Rezept zu speichern",
      title: "Rezept Speichern",
      subtitle: "Rezeptname eingeben",
      submit: "Rezept Speichern",
    },
    changesForm: {
      login: "Änderungen am Rezept speichern?",
      subtitle: "Rezeptname",
      submit: "Änderungen Speichern",
      saveAs: "Als neues Rezept speichern",
    },
    alerts: {
      loginError:
        "Du hast nicht die nötigen Berechtigungen, um dieses Rezept anzuzeigen. Bitte melde Dich an oder kontaktiere den Ersteller des Rezepts um sicherzugehen, dass das Rezept öffentlich zugänglich ist.",
      notCurrentUser:
        "Dies ist das Rezept eines anderen Benutzers. Du musst eine Kopie davon machen, um Änderungen vorzunehmen.",
    },
    private: "Privates Rezept?",
    accountPage: {
      title: "Benutzerkonto",
      theme: {
        title: "Bevorzugtes Theme",
        light: "Hell",
        dark: "Dunkel",
      },
      language: {
        title: "Bevorzugte Sprache",
      },
      units: {
        title: "Bevorzugte Einheiten",
        metric: "Metrisch",
        us: "US",
      },
      myRecipes: "Meine Rezepte",
      viewRecipe: "Rezept Ansehen",
      deleteRecipe: "Rezept Löschen",
      buttonMessage: {
        register: "Noch kein Benutzerkonto? Jetzt registrieren!",
        login: "Hast du schon ein Benutzerkonto? Hier anmelden!",
      },
      login: "Anmelden",
      register: "Registrieren",
      email: "E-Mail",
      password: "Passwort",
      or: "ODER",
    },
  },
};

export const notesTranslations = [notesAndExtras.en, notesAndExtras.de];
