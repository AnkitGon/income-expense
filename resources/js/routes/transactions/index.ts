import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:18
 * @route '/{current_team}/transactions'
 */
export const index = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{current_team}/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:18
 * @route '/{current_team}/transactions'
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
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:18
 * @route '/{current_team}/transactions'
 */
index.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:18
 * @route '/{current_team}/transactions'
 */
index.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:18
 * @route '/{current_team}/transactions'
 */
    const indexForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:18
 * @route '/{current_team}/transactions'
 */
        indexForm.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:18
 * @route '/{current_team}/transactions'
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
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/create'
 */
export const create = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{current_team}/transactions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/create'
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
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/create'
 */
create.get = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/create'
 */
create.head = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/create'
 */
    const createForm = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/create'
 */
        createForm.get = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/create'
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
* @see \App\Http\Controllers\TransactionController::store
 * @see app/Http/Controllers/TransactionController.php:49
 * @route '/{current_team}/transactions'
 */
export const store = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{current_team}/transactions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TransactionController::store
 * @see app/Http/Controllers/TransactionController.php:49
 * @route '/{current_team}/transactions'
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
* @see \App\Http\Controllers\TransactionController::store
 * @see app/Http/Controllers/TransactionController.php:49
 * @route '/{current_team}/transactions'
 */
store.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TransactionController::store
 * @see app/Http/Controllers/TransactionController.php:49
 * @route '/{current_team}/transactions'
 */
    const storeForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TransactionController::store
 * @see app/Http/Controllers/TransactionController.php:49
 * @route '/{current_team}/transactions'
 */
        storeForm.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}'
 */
export const show = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{current_team}/transactions/{transaction}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}'
 */
show.url = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    transaction: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: args.current_team,
                                transaction: args.transaction,
                }

    return show.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}'
 */
show.get = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}'
 */
show.head = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}'
 */
    const showForm = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}'
 */
        showForm.get = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}'
 */
        showForm.head = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}/edit'
 */
export const edit = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{current_team}/transactions/{transaction}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}/edit'
 */
edit.url = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    transaction: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: args.current_team,
                                transaction: args.transaction,
                }

    return edit.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}/edit'
 */
edit.get = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}/edit'
 */
edit.head = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}/edit'
 */
    const editForm = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}/edit'
 */
        editForm.get = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:0
 * @route '/{current_team}/transactions/{transaction}/edit'
 */
        editForm.head = (args: { current_team: string | number, transaction: string | number } | [current_team: string | number, transaction: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:75
 * @route '/{current_team}/transactions/{transaction}'
 */
export const update = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/{current_team}/transactions/{transaction}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:75
 * @route '/{current_team}/transactions/{transaction}'
 */
update.url = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    transaction: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                                transaction: typeof args.transaction === 'object'
                ? args.transaction.id
                : args.transaction,
                }

    return update.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:75
 * @route '/{current_team}/transactions/{transaction}'
 */
update.put = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:75
 * @route '/{current_team}/transactions/{transaction}'
 */
update.patch = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:75
 * @route '/{current_team}/transactions/{transaction}'
 */
    const updateForm = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:75
 * @route '/{current_team}/transactions/{transaction}'
 */
        updateForm.put = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:75
 * @route '/{current_team}/transactions/{transaction}'
 */
        updateForm.patch = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TransactionController::destroy
 * @see app/Http/Controllers/TransactionController.php:103
 * @route '/{current_team}/transactions/{transaction}'
 */
export const destroy = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{current_team}/transactions/{transaction}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TransactionController::destroy
 * @see app/Http/Controllers/TransactionController.php:103
 * @route '/{current_team}/transactions/{transaction}'
 */
destroy.url = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    transaction: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                                transaction: typeof args.transaction === 'object'
                ? args.transaction.id
                : args.transaction,
                }

    return destroy.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::destroy
 * @see app/Http/Controllers/TransactionController.php:103
 * @route '/{current_team}/transactions/{transaction}'
 */
destroy.delete = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TransactionController::destroy
 * @see app/Http/Controllers/TransactionController.php:103
 * @route '/{current_team}/transactions/{transaction}'
 */
    const destroyForm = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TransactionController::destroy
 * @see app/Http/Controllers/TransactionController.php:103
 * @route '/{current_team}/transactions/{transaction}'
 */
        destroyForm.delete = (args: { current_team: string | { slug: string }, transaction: number | { id: number } } | [current_team: string | { slug: string }, transaction: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const transactions = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default transactions