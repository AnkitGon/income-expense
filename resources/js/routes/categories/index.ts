import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:17
 * @route '/{current_team}/categories'
 */
export const index = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{current_team}/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:17
 * @route '/{current_team}/categories'
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
* @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:17
 * @route '/{current_team}/categories'
 */
index.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:17
 * @route '/{current_team}/categories'
 */
index.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:17
 * @route '/{current_team}/categories'
 */
    const indexForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:17
 * @route '/{current_team}/categories'
 */
        indexForm.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:17
 * @route '/{current_team}/categories'
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
* @see \App\Http\Controllers\CategoryController::create
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/create'
 */
export const create = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{current_team}/categories/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CategoryController::create
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/create'
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
* @see \App\Http\Controllers\CategoryController::create
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/create'
 */
create.get = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryController::create
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/create'
 */
create.head = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CategoryController::create
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/create'
 */
    const createForm = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CategoryController::create
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/create'
 */
        createForm.get = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CategoryController::create
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/create'
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
* @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:39
 * @route '/{current_team}/categories'
 */
export const store = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{current_team}/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:39
 * @route '/{current_team}/categories'
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
* @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:39
 * @route '/{current_team}/categories'
 */
store.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:39
 * @route '/{current_team}/categories'
 */
    const storeForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:39
 * @route '/{current_team}/categories'
 */
        storeForm.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}'
 */
export const show = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{current_team}/categories/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}'
 */
show.url = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    category: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: args.current_team,
                                category: args.category,
                }

    return show.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}'
 */
show.get = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}'
 */
show.head = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}'
 */
    const showForm = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}'
 */
        showForm.get = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}'
 */
        showForm.head = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}/edit'
 */
export const edit = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{current_team}/categories/{category}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}/edit'
 */
edit.url = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    category: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: args.current_team,
                                category: args.category,
                }

    return edit.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}/edit'
 */
edit.get = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}/edit'
 */
edit.head = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}/edit'
 */
    const editForm = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}/edit'
 */
        editForm.get = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:0
 * @route '/{current_team}/categories/{category}/edit'
 */
        editForm.head = (args: { current_team: string | number, category: string | number } | [current_team: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:59
 * @route '/{current_team}/categories/{category}'
 */
export const update = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/{current_team}/categories/{category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:59
 * @route '/{current_team}/categories/{category}'
 */
update.url = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    category: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                                category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return update.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:59
 * @route '/{current_team}/categories/{category}'
 */
update.put = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:59
 * @route '/{current_team}/categories/{category}'
 */
update.patch = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:59
 * @route '/{current_team}/categories/{category}'
 */
    const updateForm = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:59
 * @route '/{current_team}/categories/{category}'
 */
        updateForm.put = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:59
 * @route '/{current_team}/categories/{category}'
 */
        updateForm.patch = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CategoryController::destroy
 * @see app/Http/Controllers/CategoryController.php:81
 * @route '/{current_team}/categories/{category}'
 */
export const destroy = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{current_team}/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CategoryController::destroy
 * @see app/Http/Controllers/CategoryController.php:81
 * @route '/{current_team}/categories/{category}'
 */
destroy.url = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    category: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                                category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return destroy.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryController::destroy
 * @see app/Http/Controllers/CategoryController.php:81
 * @route '/{current_team}/categories/{category}'
 */
destroy.delete = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CategoryController::destroy
 * @see app/Http/Controllers/CategoryController.php:81
 * @route '/{current_team}/categories/{category}'
 */
    const destroyForm = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CategoryController::destroy
 * @see app/Http/Controllers/CategoryController.php:81
 * @route '/{current_team}/categories/{category}'
 */
        destroyForm.delete = (args: { current_team: string | { slug: string }, category: number | { id: number } } | [current_team: string | { slug: string }, category: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const categories = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default categories