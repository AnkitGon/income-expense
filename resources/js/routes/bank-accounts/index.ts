import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\BankAccountController::index
 * @see app/Http/Controllers/BankAccountController.php:17
 * @route '/{current_team}/bank-accounts'
 */
export const index = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{current_team}/bank-accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BankAccountController::index
 * @see app/Http/Controllers/BankAccountController.php:17
 * @route '/{current_team}/bank-accounts'
 */
index.url = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { current_team: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { current_team: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                }

    return index.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankAccountController::index
 * @see app/Http/Controllers/BankAccountController.php:17
 * @route '/{current_team}/bank-accounts'
 */
index.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BankAccountController::index
 * @see app/Http/Controllers/BankAccountController.php:17
 * @route '/{current_team}/bank-accounts'
 */
index.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BankAccountController::index
 * @see app/Http/Controllers/BankAccountController.php:17
 * @route '/{current_team}/bank-accounts'
 */
    const indexForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BankAccountController::index
 * @see app/Http/Controllers/BankAccountController.php:17
 * @route '/{current_team}/bank-accounts'
 */
        indexForm.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BankAccountController::index
 * @see app/Http/Controllers/BankAccountController.php:17
 * @route '/{current_team}/bank-accounts'
 */
        indexForm.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\BankAccountController::create
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/create'
 */
export const create = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{current_team}/bank-accounts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BankAccountController::create
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/create'
 */
create.url = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { current_team: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: args.current_team,
                }

    return create.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankAccountController::create
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/create'
 */
create.get = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BankAccountController::create
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/create'
 */
create.head = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BankAccountController::create
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/create'
 */
    const createForm = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BankAccountController::create
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/create'
 */
        createForm.get = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BankAccountController::create
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/create'
 */
        createForm.head = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\BankAccountController::store
 * @see app/Http/Controllers/BankAccountController.php:42
 * @route '/{current_team}/bank-accounts'
 */
export const store = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{current_team}/bank-accounts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BankAccountController::store
 * @see app/Http/Controllers/BankAccountController.php:42
 * @route '/{current_team}/bank-accounts'
 */
store.url = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { current_team: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { current_team: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                }

    return store.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankAccountController::store
 * @see app/Http/Controllers/BankAccountController.php:42
 * @route '/{current_team}/bank-accounts'
 */
store.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BankAccountController::store
 * @see app/Http/Controllers/BankAccountController.php:42
 * @route '/{current_team}/bank-accounts'
 */
    const storeForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BankAccountController::store
 * @see app/Http/Controllers/BankAccountController.php:42
 * @route '/{current_team}/bank-accounts'
 */
        storeForm.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\BankAccountController::show
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
export const show = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{current_team}/bank-accounts/{bank_account}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BankAccountController::show
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
show.url = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    bank_account: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: args.current_team,
                                bank_account: args.bank_account,
                }

    return show.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{bank_account}', parsedArgs.bank_account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankAccountController::show
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
show.get = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BankAccountController::show
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
show.head = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BankAccountController::show
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
    const showForm = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BankAccountController::show
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
        showForm.get = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BankAccountController::show
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
        showForm.head = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\BankAccountController::edit
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}/edit'
 */
export const edit = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{current_team}/bank-accounts/{bank_account}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BankAccountController::edit
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}/edit'
 */
edit.url = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    bank_account: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: args.current_team,
                                bank_account: args.bank_account,
                }

    return edit.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{bank_account}', parsedArgs.bank_account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankAccountController::edit
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}/edit'
 */
edit.get = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BankAccountController::edit
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}/edit'
 */
edit.head = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BankAccountController::edit
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}/edit'
 */
    const editForm = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BankAccountController::edit
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}/edit'
 */
        editForm.get = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BankAccountController::edit
 * @see app/Http/Controllers/BankAccountController.php:0
 * @route '/{current_team}/bank-accounts/{bank_account}/edit'
 */
        editForm.head = (args: { current_team: string | number, bank_account: string | number } | [current_team: string | number, bank_account: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\BankAccountController::update
 * @see app/Http/Controllers/BankAccountController.php:64
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
export const update = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/{current_team}/bank-accounts/{bank_account}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\BankAccountController::update
 * @see app/Http/Controllers/BankAccountController.php:64
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
update.url = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    bank_account: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                                bank_account: typeof args.bank_account === 'object'
                ? args.bank_account.id
                : args.bank_account,
                }

    return update.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{bank_account}', parsedArgs.bank_account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankAccountController::update
 * @see app/Http/Controllers/BankAccountController.php:64
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
update.put = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\BankAccountController::update
 * @see app/Http/Controllers/BankAccountController.php:64
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
update.patch = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\BankAccountController::update
 * @see app/Http/Controllers/BankAccountController.php:64
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
    const updateForm = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BankAccountController::update
 * @see app/Http/Controllers/BankAccountController.php:64
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
        updateForm.put = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\BankAccountController::update
 * @see app/Http/Controllers/BankAccountController.php:64
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
        updateForm.patch = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\BankAccountController::destroy
 * @see app/Http/Controllers/BankAccountController.php:88
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
export const destroy = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{current_team}/bank-accounts/{bank_account}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BankAccountController::destroy
 * @see app/Http/Controllers/BankAccountController.php:88
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
destroy.url = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    bank_account: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                                bank_account: typeof args.bank_account === 'object'
                ? args.bank_account.id
                : args.bank_account,
                }

    return destroy.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{bank_account}', parsedArgs.bank_account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankAccountController::destroy
 * @see app/Http/Controllers/BankAccountController.php:88
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
destroy.delete = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\BankAccountController::destroy
 * @see app/Http/Controllers/BankAccountController.php:88
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
    const destroyForm = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BankAccountController::destroy
 * @see app/Http/Controllers/BankAccountController.php:88
 * @route '/{current_team}/bank-accounts/{bank_account}'
 */
        destroyForm.delete = (args: { current_team: string | { slug: string }, bank_account: number | { id: number } } | [current_team: string | { slug: string }, bank_account: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const bankAccounts = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default bankAccounts